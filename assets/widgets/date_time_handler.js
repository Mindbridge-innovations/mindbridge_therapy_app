const DateTimeHandler=()=>{
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
      };
    
    
    
      const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(false);
        setTime(currentTime);
      };
    
      const formatDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      };
    
      const formatTime = (time) => {
        return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
      };
}

export default DateTimeHandler;