const iframe = document.getElementById('taskFrame');

const ass1 = document.getElementById('ass1');
const ass2 = document.getElementById('ass2');
const task1 = document.getElementById('task1');
const task2 = document.getElementById('task2');

ass1.addEventListener('click', () => {
    iframe.src = './assignemnt_1/index.html';
});

ass2.addEventListener('click', () => {
    iframe.src = './assignment_2/index.html';
});

task1.addEventListener('click', () => {
    iframe.src = './Lab_Task_1/index.html';
});

task2.addEventListener('click', () => {
    iframe.src = './Lab_Task_2/index.html';
});
