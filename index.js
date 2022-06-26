/**
 * クイズアプリ
 */

const quiz = [
  {
    question: 'うどん、おでん、おどん',
    answers: ['うでん', 'あだん', 'おだん', 'そば'],
    correct: 'あだん',
  },
  {
    question: '千葉、滋賀、佐賀',
    answers: ['ヤマイドウ', 'エヒフ', 'グンタマ', 'イバールルァキィー'],
    correct: 'イバールルァキィー',
  },
  {
    question: 'ミソ？ミサ？',
    answers: ['ミソ', 'ミサ', 'スミソ', 'ユズコショー'],
    correct: '醤油',
  },
];

const shuffleArray = (array) => {
  const cloneArray = [...array];

  const result = cloneArray.reduce((_, cur, idx) => {
    let rand = Math.floor(Math.random() * (idx + 1));
    cloneArray[idx] = cloneArray[rand];
    cloneArray[rand] = cur;
    return cloneArray;
  });

  return result;
};

const randQ = shuffleArray(quiz);
const $window = window;
const $doc = document;
const $question = $doc.getElementById('js-question');
const $buttons = $doc.querySelectorAll('.btn');

const qLen = randQ.length;
let qCnt = 0;
let score = 0;

const init = () => {
  $question.textContent = randQ[qCnt].question;

  const buttonLen = $buttons.length;
  let btnIndex = 0;
  while (btnIndex < buttonLen) {
    $buttons[btnIndex].textContent = randQ[qCnt].answers[btnIndex];
    btnIndex++;
  }
};

const goToNext = () => {
  qCnt++;
  if (qCnt < qLen) {
    init(qCnt);
  } else {
    showEnd();
  }
};

const judge = (elm) => {
  if (elm.textContent === randQ[qCnt].correct) {
    $window.alert('正解!');
    score++;
  } else {
    $window.alert('不正解!');
  }
  goToNext();
};

const showEnd = () => {
  $question.textContent = `終了！あなたのスコアは${score}/${qCnt}です！`;
  const $items = $doc.getElementById('js-items');
  $items.style.visibility = 'hidden';
};

init();

let aIndex = 0;
let aLen = randQ[qCnt].answers.length;

while (aIndex < aLen) {
  $buttons[aIndex].addEventListener('click', (e) => {
    judge(e.target);
  });
  aIndex++;
}
