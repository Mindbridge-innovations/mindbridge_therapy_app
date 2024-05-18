/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendChatNotification = functions.database.ref('/chat-messages/{chatRoomId}/{messageId}')
    .onCreate(async (snapshot, context) => {
        const messageData = snapshot.val();
        const recipientId = messageData.user._id; // Adjust according to your data structure

        const tokenSnapshot = await admin.database().ref(`/tokens/${recipientId}`).once('value');
        const token = tokenSnapshot.val();

        const payload = {
            notification: {
                title: `New message from ${messageData.user.name}`,
                body: messageData.text,
            }
        };

        return admin.messaging().sendToDevice(token, payload);
    });