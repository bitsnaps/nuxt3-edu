<template>
    <div class="count-down">
        <small>{{ data.days }}</small>
        day
        <small>{{ data.hours }}</small>
        :
        <small>{{ data.minutes }}</small>
        :
        <small>{{ data.seconds }}</small>
    </div>
</template>
<script setup>
const props = defineProps({
    time:{
        type:[String,Number],
        default:""
    }
})

const emit = defineEmits(["start","end"])
const data = useCountDown(props.time)

function useCountDown(end_time){
    const timeout = ref(0)
    const Timer = ref(null)

    if(typeof end_time === "string"){
        end_time = (new Date(end_time)).getTime()
    }

    // End timestamp - current timestamp, milliseconds converted to seconds
    timeout.value = (end_time - Date.now()) / 1000

    // If timeout<=0, end directly
    if(timeout.value <= 0) return emit("end")

    close()

    // Start countdown
    Timer.value = setInterval(() => {
        timeout.value--
        // If timeout.value <= 0, turn off the timer and trigger the end
        if(timeout.value <= 0){
            close()
            emit("end")
        }
    }, 1000);

    function close(){
        if(Timer.value) clearInterval(Timer.value)
    }

    // Convert seconds to days/hours/minutes/seconds
    const d = computed(()=>formatDiffDate(timeout.value))

    return d
}


// Milliseconds to Days/Hours/Minutes/Seconds
function formatDiffDate(seconds) {
    let time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    if (seconds > 0) {
        time.days = Math.floor(seconds / (60 * 60 * 24));
        time.hours = Math.floor(seconds / (60 * 60)) - time.days * 24;
        time.minutes = Math.floor(seconds / 60) - time.days * 24 * 60 - time.hours * 60;
        time.seconds = Math.floor(seconds) - time.days * 24 * 60 * 60 - time.hours * 60 * 60 - time.minutes * 60;
    }

    //Manual ternary zero padding
    time.days = time.days < 10 ? "0" + time.days : time.days;
    time.hours = time.hours < 10 ? "0" + time.hours : time.hours;
    time.minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
    time.seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds;

    return time
}
</script>
<style>
.count-down small {
    background-color: #ffffff;
    border-radius: 2px;
    padding: 2px 3px;
    margin: 0 3px;
    @apply text-yellow-500;
}
</style>