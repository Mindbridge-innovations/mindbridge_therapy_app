import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import mystyles from '../../assets/stylesheet';
import { useNavigation } from '@react-navigation/native';

const ResourcesScreen = () => {
    const navigation=useNavigation()
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [expandedGuide, setExpandedGuide] = useState(null);

    const guides = {
        anxiety: [
            "Understanding Anxiety: Anxiety is a normal emotion that can become a medical disorder when it is excessive and persistent. It involves excessive nervousness, fear, apprehension, and worry.",
            "Common Triggers: Major life changes, workplace stress, relationship issues, financial worries, or ongoing physical health problems can trigger anxiety.",
            "Breathing Techniques: Practice the 4-7-8 breathing method. Inhale for 4 seconds, hold for 7 seconds, and exhale slowly for 8 seconds. Repeat this cycle to help calm your mind.",
            "Long-Term Strategies: Engage in regular physical activity, maintain a healthy diet, get enough sleep, and practice mindfulness to manage anxiety.",
            "When to Seek Professional Help: If anxiety significantly impacts your daily life, consider seeking help from a mental health professional."
        ],
        depression: [
            "What is Depression?: Depression is a common but serious mood disorder. It causes severe symptoms that affect how you feel, think, and handle daily activities.",
            "Self-Care Techniques: Engage in activities like mindfulness, journaling, and regular exercise to help manage symptoms of depression.",
            "Building a Support Network: Connect with friends, family, or support groups. Sharing your experiences with others can provide emotional support.",
            "Routine and Structure: Creating a daily routine can help bring structure and stability, which is beneficial in managing depression.",
            "Professional Resources: Consider consulting a healthcare provider for therapies like Cognitive Behavioral Therapy (CBT) or medication."
        ],
        substanceAbuse: [
            "Understanding Addiction: Substance abuse can lead to addiction, a disease that affects the brain and behavior. It's characterized by the compulsive use of substances despite harmful consequences.",
            "Identifying Triggers: Recognize situations that incite substance use. Developing strategies to manage these triggers is crucial for recovery.",
            "Coping Mechanisms: Find healthy ways to cope with stress, such as engaging in sports, hobbies, or other fulfilling activities that do not involve substance use.",
            "Recovery Plan: Set clear, achievable goals for recovery. Include both short-term goals (like attending a daily support meeting) and long-term goals (like maintaining sobriety for a year).",
            "Seeking Help: Reach out to local support groups, therapists, or rehabilitation centers for professional help in overcoming addiction."
        ]
    };



    const videos = [
        {
            title: "Signs of anxiety and depression",
            src: "https://www.youtube-nocookie.com/embed/yrFnqyR6htc?si=YyStnuJ2dthYDknR&amp&start=1"
        },
        {
            title: "What is anxious depression",
            src: "https://www.youtube-nocookie.com/embed/oWJuIkzjbPc?si=IRf2y0Ejc9yUmL5t&amp&start=1"
        },
        {
            title:"Escaping the Anxiety/Burnout/Depression Cycle",
            src: "https://www.youtube-nocookie.com/embed/8vfLmShk7MM?si=JOkTc6fv7NrCGM_6&amp&start=1"
        },
        {
            title: "Medications for Anxiety and Depression - Pharmacology - Nervous System",
            src: "https://www.youtube-nocookie.com/embed/Hpf4oz11VJY?si=SRKMqNbiMFVp_Q3_&amp&start=1"
        },
        {
            title: "Atomic Habits for Mental Health",
            src: "https://www.youtube-nocookie.com/embed/AOHT-YiOeQA?si=rTO2UNzQkkTCqBb7&amp&start=1"
        },
        {
            title: "Substance Use Disorders: Signs, Common Addictions, Treatment Options | Mass General Brigham",
            src: "https://www.youtube-nocookie.com/embed/jOJrfjUeSCo?si=53oXm3MfWPWpOTph&amp&start=1"
        },
        {
            title: "Substance Use Disorder",
            src: "https://www.youtube-nocookie.com/embed/Hgn7MJjMfkk?si=TICnSo3KrUQyABuT&amp&start=1"
        }
    ];

    const centers = [
        {
            name: "1. Butatbika National Referal Mental Hospital",
            url: "https://www.butabikahospital.go.ug/"
        },
        {
            name: "2. Mental Health Uganda",
            url: "https://www.mentalhealthuganda.org/"
        },
        {
            name: "3. Fortuna Care Uganda",
            url: "https://kernelspaces.com/fortunacare/"
        },
    ];

    const handleOpenBook = (url) => {
        Linking.openURL(url);
    };

    const handleCallHotline = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const toggleCategory = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
            setSelectedGuide(null);  // Reset the selected guide when collapsing the category
        } else {
            setExpandedCategory(category);
        }
    };

    const handleSelectGuide = (guideType) => {
        if (expandedGuide === guideType) {
            setExpandedGuide(null);  // Collapse the guide if it's already expanded
        } else {
            setExpandedGuide(guideType);  // Expand the new guide
        }
        setSelectedGuide(guides[guideType]);
    };
    const handleOpenCenter = (url) => {
        navigation.navigate('WebViewScreen', { url }); // Navigate to WebViewScreen with URL
    };
    return (
        <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
            <View style={{ padding: 20, width: '100%', flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Please use the below resources at your convenience for mental health guidance</Text>
                
                <TouchableOpacity onPress={() => toggleCategory('videos')} style={mystyles.resourceCategory}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={mystyles.categoryText}>Videos</Text>
                        <Text style={{ marginRight: 5,color:'white' }}>{expandedCategory === 'videos' ? '▼' : '▶'}</Text>
                    </View>
                </TouchableOpacity>
                {expandedCategory === 'videos' && videos.map((video, index) => (
                    <View key={index}>
                        <Text style={{ fontWeight: 'bold' }}>{video.title}</Text>
                        <WebView
                            style={{ height: 220, width: Dimensions.get('window').width * 0.9 }}
                            source={{
                                html: `<iframe width="100%" height="600" src="${video.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen"></iframe>`
                            }}
                        />
                    </View>
                ))}

                {/* mental health hotlines list display with link to trigger voice call */}
                <TouchableOpacity onPress={() => toggleCategory('hotlines')} style={mystyles.resourceCategory}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={mystyles.categoryText}>Hotlines</Text>
                        <Text style={{ marginRight: 5,color:'white' }}>{expandedCategory === 'hotlines' ? '▼' : '▶'}</Text>
                    </View>

                </TouchableOpacity>
                {expandedCategory === 'hotlines' && (
                    <>
                          <Text>Click on each hotline to trigger call</Text>
                    <Text style={[{ fontWeight: 'bold', fontSize: 18 },mystyles.categoryLinks]}>Sucide & crisis lines</Text>
                    <Text onPress={() => handleCallHotline('0800212121')} style={mystyles.categoryLinks}>
                        1. Hotline1: Mental Health Uganda (0800 212121)
                    </Text>
                    
                    <Text onPress={() => handleCallHotline('0 414 664 730')} style={mystyles.categoryLinks}>
                            2. Hotline2: Uganda Harm Reduction Network ((256) 414 664 730)
                    </Text>

                    <Text style={[{ fontWeight: 'bold', fontSize: 18 },mystyles.categoryLinks]}>Other related Hotlines</Text>
                    <Text onPress={() => handleCallHotline('0 785 720 795')} style={mystyles.categoryLinks}>
                            1. Hotline1: Uganda Alcohol Policy Alliance (+256 785 720 795)
                    </Text>
                    <Text onPress={() => handleCallHotline('(0 414 530 353')} style={mystyles.categoryLinks}>
                            2. Hotline2: Uganda Youth development link ((256) 414 530 353)
                    </Text>
                    </>
                )}

<           TouchableOpacity onPress={() => toggleCategory('guides')} style={mystyles.resourceCategory}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={mystyles.categoryText}>Interactive Guides</Text>
                    <Text style={{ marginRight: 5, color: 'white' }}>{expandedCategory === 'guides' ? '▼' : '▶'}</Text>
                </View>
            </TouchableOpacity>
            {expandedCategory === 'guides' && (
                <View style={styles.guideSelection}>
                    {/* anxiety interactive guide subcategory */}

                    <TouchableOpacity onPress={() => handleSelectGuide('anxiety')} style={styles.button}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={mystyles.categoryText}>Anxiety Guide</Text>
                            <Text style={{ marginRight: 5, color: 'white' }}>{expandedGuide === 'anxiety' ? '▼' : '▶'}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* depression interactive guide subcategory */}
                    <TouchableOpacity onPress={() => handleSelectGuide('depression')} style={styles.button}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={mystyles.categoryText}>Depression Guide</Text>
                            <Text style={{ marginRight: 5, color: 'white' }}>{expandedGuide === 'depression' ? '▼' : '▶'}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* substance abuse interactive subcategory */}
                    <TouchableOpacity onPress={() => handleSelectGuide('substanceAbuse')} style={styles.button}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={mystyles.categoryText}>Substance Abuse Guide</Text>
                            <Text style={{ marginRight: 5, color: 'white' }}>{expandedGuide === 'substanceAbuse' ? '▼' : '▶'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            {/* display the selected interactive guide content */}
            {selectedGuide && (
                <View style={styles.guideContainer}>
                    {selectedGuide.map((item, index) => (
                        <Text key={index} style={styles.guideText}>{item}</Text>
                    ))}
                </View>
            )}


            {/* The list of the rehabilitation centers for mental health displayed below with link to website */}
            <TouchableOpacity onPress={() => toggleCategory('centers')} style={mystyles.resourceCategory}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={mystyles.categoryText}>Treatment & Rehabilitation Centers</Text>
                    <Text style={{ marginRight: 5, color: 'white' }}>{expandedCategory === 'centers' ? '▼' : '▶'}</Text>
                </View>
            </TouchableOpacity>

            {/* show the rehabilation centers when it is expanded */}
            {expandedCategory === 'centers' && (
                <>
                    <Text style={{ padding: 10, fontStyle: 'italic' }}>Click on each center to visit its website.</Text>
                    {centers.map((center, index) => (
                        <Text key={index} onPress={() => handleOpenCenter(center.url)} style={mystyles.categoryLinks}>
                            {center.name}
                        </Text>
                    ))}
                    {/* display the rehabilitation and treatment centers in uganda in a map */}
                    <Text style={{ padding: 10, fontWeight: 'bold' }}>Below is the map showing the location of the centers:</Text>
                    <WebView
                        style={{ height: 1000, width: Dimensions.get('window').width*0.9 }}
                        source={{ uri: "https://www.google.com/search?sca_esv=d2fbde582ddfbd7f&tbs=lf:1,lf_ui:2&tbm=lcl&sxsrf=ADLYWIKNTPuejFDvkRJkLgvoXWwtVDB7Rw:1716539666291&q=mental+health+centers+in+uganda&rflfq=1&num=10&sa=X&ved=2ahUKEwi6-bTI8KWGAxXonf0HHYFhCcMQjGp6BAgyEAE&biw=1366&bih=620#rlfi=hd:;si:;mv:[[0.42277870338386403,32.574097872057266],[0.2597033426121991,32.432305574693984]]" }}
                        startInLoadingState={true}
                    />
                </>
            )}

           

            

                
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft:30
    },
   
    guideSelection: {
        marginBottom: 20
    },
    guideContainer: {
        marginTop: 20
    },
    guideText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24
    }
});


export default ResourcesScreen;