<template>
    <div class="loader">
        <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<style scoped>
.loader {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top:50%;
    left:50%;
    margin-top: -1.5rem;
    margin-left: -1.5rem;
    position: absolute;
}
.loading{
    position: relative
}

.loading span {
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #333;
    position: absolute
}

.loading span:nth-of-type(1) {
    top: 25px;
    left: 0;
    -webkit-animation: loading-3 1s ease 0s infinite
}
@-webkit-keyframes loading-3{
    50% {
        transform: scale(.4);
        opacity: .3
    }
    100% {
         transform: scale(1);
         opacity: 1
     }
}

.loading span:nth-of-type(2) {
    top: 17px;
    left: 17px;
    -webkit-animation: loading-3 1s ease -.12s infinite
}

.loading span:nth-of-type(3) {
    top: 0;
    left: 25px;
    -webkit-animation: loading-3 1s ease -.24s infinite
}

.loading span:nth-of-type(4) {
    top: -17px;
    left: 17px;
    -webkit-animation: loading-3 1s ease -.36s infinite
}

.loading span:nth-of-type(5) {
    top: -25px;
    left: 0;
    -webkit-animation: loading-3 1s ease -.48s infinite
}

.loading span:nth-of-type(6) {
    top: -17px;
    left: -17px;
    -webkit-animation: loading-3 1s ease -.6s infinite
}

.loading span:nth-of-type(7) {
    top: 0;
    left: -25px;
    -webkit-animation: loading-3 1s ease -.72s infinite
}

.loading span:nth-of-type(8) {
    top: 17px;
    left: -17px;
    -webkit-animation: loading-3 1s ease -.84s infinite
}
</style>