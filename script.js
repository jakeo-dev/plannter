const currentYear = new Date().getFullYear();
const currentMonth = Number(String(new Date().getMonth() + 1).padStart(2, '0'));
const currentDay = Number(String(new Date().getDate()).padStart(2, '0'));
const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
const oneDay = 24 * 60 * 60 * 1000; // hours * mins * secs * millisecs

let gradDay
let gradMonth
let gradYear;
let gradDate;

let advWeight = 0;
let colWeight = 0;
let honWeight = 0.5;
let apWeight = 1;
let ibWeight = 1;

let plusMinus;

if (typeof localStorage.getItem('gpaPlusMinus') !== 'undefined') {
    if (localStorage.getItem('gpaPlusMinus') == 'true') {
        plusMinus = true;
    } else {
        plusMinus = false;
    }
} else {
    plusMinus = false;
}

const promptList = ['Share a personal story that illustrates your resilience in the face of adversity.',
    'Describe a moment when you challenged a deeply held belief and how it affected your perspective.',
    'Describe an experience that sparked your passion for a cause or interest that is meaningful to you.',
    'Reflect on a time when you had to navigate cultural differences and what you learned from it.',
    'Describe a volunteering experience that changed your outlook on community service.',
    'Discuss a fictional character or historical figure who inspires you and why.',
    'Share a challenge you encountered while pursuing a creative project and how you overcame it.',
    'Reflect on an experience that prompted you to explore your cultural heritage.',
    'Describe an innovative solution you developed for a real-life problem.',
    'Discuss a time when you had to advocate for someone else or a cause you believe in.',
    'Share a moment when you learned the importance of self-care and balance.',
    'Reflect on a book that significantly influenced your intellectual growth.',
    'Describe a time when you had to mediate a conflict and facilitate understanding.',
    'Discuss a mentor or teacher who played a pivotal role in your personal development.',
    'Share a project or organization you started that impacted your school or community.',
    'Reflect on a time when you had to make a difficult ethical decision.',
    'Describe an experience that changed your perspective on global issues.',
    'Discuss an unconventional hobby or interest and how it shaped your identity.',
    'Share a moment when you embraced vulnerability and its impact on your relationships.',
    'Reflect on a time when you learned a valuable lesson through failure.',
    'Describe a scientific discovery or technological advancement that fascinates you.',
    'Discuss an experience that challenged your understanding of privilege and inequality.',
    'Share a personal experience that influenced your academic or career aspirations.',
    'Describe a time when you used storytelling to create meaningful change.',
    'Discuss a historical event that made you contemplate your role as a global citizen.',
    'Share a piece of art, music, or writing that deeply resonates with you and why.',
    'Reflect on a time when you mentored or supported someone to achieve their goals.',
    'Describe an experience that led you to pursue a non-traditional academic interest.',
    'Share an impactful project where your expertise addressed a societal issue.',
    'Share a humorous incident that taught you an essential life lesson.',
    'Reflect on a time when you had to advocate for your own rights or beliefs.',
    'Discuss an initiative you took to promote diversity and inclusion in your community.',
    'Share a cultural tradition or celebration that holds significant meaning for you.',
    'Reflect on a time when you had to adapt to a new environment or circumstance.',
    'Describe a person you would invite to a dinner party and the conversation you\'d have.',
    'Discuss an experience that made you rethink your approach to time management.',
    'Share a moment when you used your artistic talents to convey a powerful message.',
    'Reflect on a time when you had to address a misunderstanding or miscommunication.',
    'Describe a social issue you are passionate about and your efforts to address it.',
    'Discuss an experience that made you appreciate the value of teamwork and collaboration.',
    'Share a dream or aspiration you have and the steps you are taking to achieve it.',
    'Reflect on a time when you had to step out of your comfort zone to grow.',
    'Describe an experience that made you question the meaning of success.',
    'Discuss a community organization or initiative you\'d like to create in college.',
    'Share a time when you had to confront a stereotype and challenge its validity.',
    'Reflect on a time when you had to prioritize your mental or physical well-being.',
    'Discuss a future career path and how it aligns with your personal values.',
    'Share a significant childhood memory that shaped your personality.',
    'Reflect on a time when you had to overcome a fear or phobia.',
    'Describe a cultural tradition that is important to your family and its significance to you.',
    'Discuss an experience that changed your perspective on health and well-being.',
    'Share a moment when you had to make a difficult decision and its impact on your life.',
    'Describe a research or academic project that excites you and why.',
    'Discuss an experience that taught you the value of effective communication.',
    'Share a memorable encounter with someone from a different cultural background.',
    'Reflect on a time when you had to reevaluate your long-term goals.',
    'Describe a community initiative that you believe should be amplified and why.',
    'Discuss a memorable interaction with a family member that influenced your values.',
    'Share an experience that made you question traditional societal norms.',
    'Reflect on a time when you encountered a language barrier and how you overcame it.',
    'Describe an event or activity that exemplifies your sense of curiosity.',
    'Discuss a time when you faced a financial challenge and how you managed it.',
    'Share a moment when you demonstrated empathy and understanding towards others.',
    'Reflect on a time when you utilized critical thinking to solve a complex problem.',
    'Describe a skill you possess and how you plan to further develop it in college.',
    'Discuss an experience that deepened your appreciation for nature and the environment.',
    'Share a piece of advice you received that significantly impacted your life choices.',
    'Reflect on a time when you took the initiative to bring positive change in your community.',
    'Describe an experience that showcased your ability to work well under pressure.',
    'Discuss a historical figure or social activist who inspires your commitment to change.',
    'Share a moment when you successfully persuaded others to support a cause.',
    'Reflect on a time when you sought feedback and used it to improve yourself.',
    'Describe a hobby or interest that connects you with a diverse group of people.',
    'Discuss an experience that challenged your understanding of ethics and morality.',
    'Share a time when you successfully bridged a cultural or generational gap.',
    'Reflect on a moment when you had to make a decision that challenged your values.',
    'Discuss an experience that inspired your commitment to global citizenship.',
    'Share a moment when you faced an unexpected obstacle and how you handled it.',
    'Reflect on a time when you organized an event or initiative to benefit others.',
    'Describe a historical event or period that fascinates you and its relevance today.',
    'Discuss a time when you collaborated with a team to overcome a significant challenge.',
    'Share a moment when you advocated for inclusive practices in your school or community.',
    'Reflect on an experience that taught you the importance of time management.',
    'Describe a future innovation or technology you would like to see developed.',
    'Discuss an experience that changed your perception of your own cultural identity.',
    'Share a significant achievement that resulted from your perseverance and dedication.',
    'Reflect on a time when you mentored or assisted a peer in their academic journey.',
    'Describe an experience that highlighted the importance of effective leadership.',
    'Discuss a time when you demonstrated resilience in the face of a difficult situation.',
    'Share a moment when you took initiative to address an issue in your school or community.',
    'Reflect on a time when you took a different approach to problem-solving.',
    'Describe an event or activity that rekindled your passion for learning and growth.',
    'Discuss an experience that influenced your understanding of social justice and equality.',
    'Share a piece of art, literature, or music that profoundly impacted your perspective.',
    'Reflect on a personal growth experience that changed your outlook on life.']
// prompts generated by chatgpt

input = document.getElementById('courseTitle');
input.addEventListener('keyup', function () {
    if (input.value.toLowerCase().includes('advance') || input.value.toLowerCase().includes('accel') || input.value.toLowerCase().includes('honor') || input.value.toLowerCase().includes(' ap') || input.value.toLowerCase().includes('ap ') || input.value.toLowerCase().includes(' ib') || input.value.toLowerCase().includes('ib ')) {
        document.getElementById('diffTip').classList.remove('hidden');
        input.classList.remove('mb-4');
    } else {
        document.getElementById('diffTip').classList.add('hidden');
        input.classList.add('mb-4');
    }
});

inputE = document.getElementById('courseTitleEdit');
inputE.addEventListener('keyup', function () {
    if (inputE.value.toLowerCase().includes('advance') || inputE.value.toLowerCase().includes('accel') || inputE.value.toLowerCase().includes('honor') || inputE.value.toLowerCase().includes(' ap') || inputE.value.toLowerCase().includes('ap ') || inputE.value.toLowerCase().includes(' ib') || inputE.value.toLowerCase().includes('ib ')) {
        document.getElementById('diffTipEdit').classList.remove('hidden');
        inputE.classList.remove('mb-4');
    } else {
        document.getElementById('diffTipEdit').classList.add('hidden');
        inputE.classList.add('mb-4');
    }
});

getLists();
getCourses();
getActs();
getTests();
getEssays();
getConnections();
getCD();
calcListDiff();
calcCumDiff();
calcGPA();
calcCumGPA();
calcECStrength();

let badIcons = document.getElementsByTagName('i');
for (let l = 0; l < badIcons.length; l++) {
    if (badIcons[l].className.includes('text-lg')) {
        badIcons[l].classList.remove('text-lg');
        badIcons[l].classList.add('optI');
    }
}

if (typeof course !== 'undefined' && course.innerHTML.includes(course.id + 'SbjI')) {
    document.getElementById('deleteModal').classList.remove('fadeIn');
    document.getElementById('deleteModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function toggleMenu() {
    if (document.getElementById('optionsDiv').className.includes('fadeIn')) {
        document.getElementById('optionsDiv').classList.remove('fadeIn');
        document.getElementById('optionsDiv').classList.add('fadeOut');
    } else {
        document.getElementById('optionsDiv').classList.add('fadeIn');
        document.getElementById('optionsDiv').classList.remove('fadeOut');
    }
}

document.onclick = function (e) {
    if (e.target.id != 'optionsDiv' && !e.target.className.includes('optBtn') && e.target.id != 'optionsBtn' && e.target.id != 'optionsBtnI' && !e.target.className.includes('optBtnI') && !e.target.className.includes('optBtnSpan')) {
        document.getElementById('optionsDiv').classList.add('fadeIn');
        document.getElementById('optionsDiv').classList.remove('fadeOut');
    }
};

function toggleMenuSm() {
    document.getElementById('menuDiv').classList.toggle('fadeOut');
    document.getElementById('menuDiv').classList.toggle('fadeIn');
}

// set theme on page load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark';
} else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light';
}

function toggleDark() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark') {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light';

    } else {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark';
    }
}

function selTestSpeciesFunc() {
    document.getElementById('testSubSpecies').classList.add('hidden');
    document.getElementById('testSpeciesOther').classList.add('hidden');
    document.getElementById('testSubScoreDiv').classList.add('hidden');
    document.getElementById('testSubScoreDiv').classList.remove('flex');

    if (document.getElementById('selTestSpecies').value == 'AP') {
        document.getElementById('testSubSpecies').classList.remove('hidden');
    } else if (document.getElementById('selTestSpecies').value == 'SAT' || document.getElementById('selTestSpecies').value == 'PSAT') {
        document.getElementById('testSubScoreDiv').classList.remove('hidden');
        document.getElementById('testSubScoreDiv').classList.add('flex');
    } else if (document.getElementById('selTestSpecies').value == 'Other') {
        document.getElementById('testSpeciesOther').classList.remove('hidden');
    }
}

function selTestSpeciesEditFunc() {
    document.getElementById('testSubSpeciesEdit').classList.add('hidden');
    document.getElementById('testSpeciesOtherEdit').classList.add('hidden');
    document.getElementById('testSubScoreDivEdit').classList.add('hidden');
    document.getElementById('testSubScoreDivEdit').classList.remove('flex');

    if (document.getElementById('selTestSpeciesEdit').value == 'AP') {
        document.getElementById('testSubSpeciesEdit').classList.remove('hidden');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'SAT' || document.getElementById('selTestSpeciesEdit').value == 'PSAT') {
        document.getElementById('testSubScoreDivEdit').classList.remove('hidden');
        document.getElementById('testSubScoreDivEdit').classList.add('flex');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'Other') {
        document.getElementById('testSpeciesOtherEdit').classList.remove('hidden');
    }
}

function selLetterGradeFunc() {
    document.getElementById('percentGrade').classList.add('hidden');

    if (document.getElementById('selLetterGrade').value == 'Use percent') {
        document.getElementById('percentGrade').classList.remove('hidden');
    }
}

function selLetterGradeEditFunc() {
    document.getElementById('percentGradeEdit').classList.add('hidden');

    if (document.getElementById('selLetterGradeEdit').value == 'Use percent') {
        document.getElementById('percentGradeEdit').classList.remove('hidden');
    }
}

function selLetterGrade2Func() {
    document.getElementById('percentGrade2').classList.add('hidden');

    if (document.getElementById('selLetterGrade2').value == 'Use percent') {
        document.getElementById('percentGrade2').classList.remove('hidden');
    }
}

function selLetterGrade2EditFunc() {
    document.getElementById('percentGrade2Edit').classList.add('hidden');

    if (document.getElementById('selLetterGrade2Edit').value == 'Use percent') {
        document.getElementById('percentGrade2Edit').classList.remove('hidden');
    }
}

function openAddCourse(num) {
    document.getElementById('courseModal').classList.remove('fadeIn');
    document.getElementById('courseModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');

    document.getElementById('selGradeLev').value = num;
}

function openAddAct(num) {
    document.getElementById('actModal').classList.remove('fadeIn');
    document.getElementById('actModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');

    document.getElementById('selStrength').value = num;
}

function openAddTest() {
    document.getElementById('testModal').classList.remove('fadeIn');
    document.getElementById('testModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openAddEssay() {
    document.getElementById('essayModal').classList.remove('fadeIn');
    document.getElementById('essayModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openAddConnection() {
    document.getElementById('connectionModal').classList.remove('fadeIn');
    document.getElementById('connectionModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openDiff() {
    document.getElementById('diffModal').classList.remove('fadeIn');
    document.getElementById('diffModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openGPA() {
    document.getElementById('gpaModal').classList.remove('fadeIn');
    document.getElementById('gpaModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openECStrength() {
    document.getElementById('ecStrengthModal').classList.remove('fadeIn');
    document.getElementById('ecStrengthModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openCD() {
    document.getElementById('countdownModal').classList.remove('fadeIn');
    document.getElementById('countdownModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');

    if (gradDay != NaN && gradDay != null && gradDay != 0) {
        document.getElementById('gradDay').value = gradDay;
    }
    if (gradMonth != NaN && gradMonth != null && gradMonth != 0) {
        document.getElementById('gradMonth').value = gradMonth;
    }
    if (gradYear != NaN && gradYear != null && gradYear != 0) {
        document.getElementById('gradYear').value = gradYear;
    }
}

function openChangeGPACalc() {
    document.getElementById('changeGPAModal').classList.remove('fadeIn');
    document.getElementById('changeGPAModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');

    document.getElementById('plusMinusSwitch').checked = plusMinus;
    document.getElementById('advWeightInp').value = advWeight;
    document.getElementById('colWeightInp').value = colWeight;
    document.getElementById('honWeightInp').value = honWeight;
    document.getElementById('apWeightInp').value = apWeight;
    document.getElementById('ibWeightInp').value = ibWeight;
}

let buttons = document.querySelectorAll('.planBtns');
buttons.forEach((planBtns) => {
    planBtns.addEventListener('click', () => {
        // add/remove classes from all buttons
        buttons.forEach((planBtns) => {
            planBtns.classList.remove('bg-emerald-600/30');
            planBtns.classList.remove('text-gray-600');
            planBtns.classList.remove('dark:text-gray-300/80');
            planBtns.classList.add('text-gray-500');
            planBtns.classList.add('hover:bg-gray-400/30');
            planBtns.classList.add('dark:hover:bg-gray-600/30');
            planBtns.classList.add('active:bg-gray-400/50');
            planBtns.classList.add('dark:active:bg-gray-600/50');
        });

        // add/remove classes to the clicked button
        planBtns.classList.add('bg-emerald-600/30');
        planBtns.classList.add('text-gray-600');
        planBtns.classList.add('dark:text-gray-300/80');
        planBtns.classList.remove('text-gray-500');
        planBtns.classList.remove('hover:bg-gray-400/30');
        planBtns.classList.remove('dark:hover:bg-gray-600/30');
        planBtns.classList.remove('active:bg-gray-400/50');
        planBtns.classList.remove('dark:active:bg-gray-600/50');
    });
});

function showPlan() {
    document.getElementById('planDiv').classList.remove('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    document.getElementById('essaysDiv').classList.add('hidden');
    document.getElementById('connectionsDiv').classList.add('hidden');
    toggleMenuSm();
}

function showActs() {
    document.getElementById('actsDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    document.getElementById('essaysDiv').classList.add('hidden');
    document.getElementById('connectionsDiv').classList.add('hidden');
    toggleMenuSm();
}

function showTests() {
    document.getElementById('testsDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    document.getElementById('essaysDiv').classList.add('hidden');
    document.getElementById('connectionsDiv').classList.add('hidden');
    toggleMenuSm();
}

function showEssays() {
    document.getElementById('essaysDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    document.getElementById('connectionsDiv').classList.add('hidden');
    toggleMenuSm();
}

function showConnections() {
    document.getElementById('connectionsDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    document.getElementById('essaysDiv').classList.add('hidden');
    toggleMenuSm();
}

document.getElementById('addCourseBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let cTitleInput = document.getElementById('courseTitle').value.trim();
    let cGradeLevInput = document.getElementById('selGradeLev').value;
    let cSubInput = document.getElementById('selSubject').value;
    let cAdvInput = document.getElementById('selDiff').value;
    let cDiff2Input = document.getElementById('selDiff2').value;
    let cLetterGradeInput = document.getElementById('selLetterGrade').value;
    let cPercentGradeInput = document.getElementById('percentGrade').value;
    let cLetterGradeInput2 = document.getElementById('selLetterGrade2').value;
    let cPercentGradeInput2 = document.getElementById('percentGrade2').value;

    if (cTitleInput.length > 80) {
        alert('Course title is too long');
    } else if (cTitleInput == '') {
        alert('Enter the title of your course');
    } else if ((cLetterGradeInput == 'Use percent' && (Number(cPercentGradeInput) > 100 || Number(cPercentGradeInput) < 0)) || (cLetterGradeInput2 == 'Use percent' && (Number(cPercentGradeInput2) > 100 || Number(cPercentGradeInput2) < 0))) {
        alert('Grade not possible');
    } else {
        let course = document.createElement('li');
        course.className = 'item course';
        course.name = cTitleInput;
        // course.draggable = true;

        course.id = 'C' + Math.floor(100000000 + Math.random() * 900000000);

        if (cLetterGradeInput == 'Use percent') {
            letter = getLetter(cPercentGradeInput);
            course.grade = letter + ' ' + ((Math.round((cPercentGradeInput) * 100)) / 100) + '%';
        } else {
            course.grade = cLetterGradeInput;
        }

        if (cLetterGradeInput2 == 'Use percent') {
            letter = getLetter(cPercentGradeInput2);
            course.grade2 = letter + ' ' + ((Math.round((cPercentGradeInput2) * 100)) / 100) + '%';
        } else {
            course.grade2 = cLetterGradeInput2;
        }

        let div = document.createElement('div');
        div.id = course.id + 'Grade';
        let t = document.createTextNode(course.grade);
        div.className = 'attr grade';
        if (course.grade == 'none') {
            div.classList.add('hidden');
        }
        div.appendChild(t);
        course.appendChild(div);

        div = document.createElement('div');
        div.id = course.id + 'Grade2';
        t = document.createTextNode(course.grade2);
        div.className = 'attr grade';
        if (course.grade2 == 'none') {
            div.classList.add('hidden');
        }
        div.appendChild(t);
        course.appendChild(div);

        t = document.createTextNode(course.name);
        let span = document.createElement('span');
        span.id = course.id + 'Text';
        span.appendChild(t);
        course.appendChild(span);

        course.gradeLevel = cGradeLevInput;

        course.diff = cAdvInput;
        course.diff2 = cDiff2Input;
        course.diffFull = course.diff * course.diff2;

        div = document.createElement('div');
        div.id = course.id + 'Diff';
        [diffText, diffClass] = getDiff(course.diff);
        t = document.createTextNode(diffText);
        div.className = diffClass;
        div.appendChild(t);
        course.appendChild(div);

        div = document.createElement('div');
        div.id = course.id + 'Diff2';
        diff2Class = getDiff2(course.diff2);
        div.className = diff2Class;
        course.appendChild(div);

        if (course.sub == 'PE') {
            course.diffFull = course.diffFull * 0.01;
        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit course';
        btn.title = 'Edit course';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove course';
        btn.title = 'Remove course';
        btn.appendChild(icon);
        div.appendChild(btn);

        course.appendChild(div);

        localStorage.setItem(course.id + 'Name', course.name);
        localStorage.setItem(course.id + 'GradeLevel', course.gradeLevel);
        localStorage.setItem(course.id + 'Sub', course.sub);
        localStorage.setItem(course.id + 'Diff', course.diff);
        localStorage.setItem(course.id + 'Diff2', course.diff2);
        localStorage.setItem(course.id + 'DiffFull', course.diffFull);
        localStorage.setItem(course.id + 'Grade', course.grade);
        localStorage.setItem(course.id + 'Grade2', course.grade2);

        document.getElementById('list' + course.gradeLevel).appendChild(course);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        calcListDiff();
        calcGPA();
        calcCumGPA();
        calcCumDiff();
        saveLists();
        hide();
    }
})

document.getElementById('addActBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let aTitleInput = document.getElementById('actTitle').value.trim();
    let aDescInput = document.getElementById('actDesc').value.trim();
    let aCategoryInput = document.getElementById('selActCategory').value;
    let aStrengthInput = document.getElementById('selStrength').value;

    if (aTitleInput.length > 180) {
        alert('Actvity title is too long');
    } else if (aDescInput.length > 400) {
        alert('Actvity description is too long');
    } else if (aTitleInput == '') {
        alert('Enter the title of your activity');
    } else {
        let activity = document.createElement('li');
        activity.className = 'item activity';
        activity.name = aTitleInput;

        activity.id = 'A' + Math.floor(100000000 + Math.random() * 900000000);

        activity.category = aCategoryInput;
        let i = document.createElement('i');
        i.id = activity.id + 'ActI';
        actClass = getActIcon(activity.category);
        i.className = actClass;
        i.ariaLabel = activity.category;
        activity.appendChild(i);

        t = document.createTextNode(activity.name);
        let span = document.createElement('span');
        span.id = activity.id + 'Text';
        span.appendChild(t);
        activity.appendChild(span);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit activity';
        btn.title = 'Edit activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove activity';
        btn.title = 'Remove activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        activity.appendChild(div);

        activity.desc = aDescInput;
        span = document.createElement('span');
        span.className = 'desc';
        if (activity.desc == '') span.classList.add('hidden');
        span.id = activity.id + 'Desc';
        t = document.createTextNode(activity.desc);
        span.appendChild(t);
        activity.appendChild(span);

        activity.strength = aStrengthInput;

        localStorage.setItem(activity.id + 'Name', activity.name);
        localStorage.setItem(activity.id + 'Desc', activity.desc);
        localStorage.setItem(activity.id + 'Category', activity.category);
        localStorage.setItem(activity.id + 'Strength', activity.strength);

        if (activity.strength == 1) {
            document.getElementById('listActs').appendChild(activity);
        } else {
            document.getElementById('listActs' + activity.strength).appendChild(activity);
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        calcECStrength();
        hide();
    }
})

document.getElementById('addTestBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let tSpeciesInput = document.getElementById('selTestSpecies').value;
    let tSubSpeciesInput = document.getElementById('testSubSpecies').value.trim();
    let tSpeciesOtherInput = document.getElementById('testSpeciesOther').value.trim();
    let tMonthInput = document.getElementById('testMonth').value;
    let tYearInput = document.getElementById('testYear').value;
    let tScoreInput = document.getElementById('testScore').value;
    let tReadScoreInput = document.getElementById('readingTestScore').value;
    let tMathScoreInput = document.getElementById('mathTestScore').value;

    if (tMonthInput < 1 || tMonthInput > 12) {
        alert('Enter a valid month 1-12');
    } else if (tYearInput < 1900 || tYearInput > currentYear + 10) {
        alert('Enter a valid year');
    } else if (tScoreInput < 0 || tScoreInput > 9999 || tReadScoreInput < 0 || tMathScoreInput < 0 || ((tSpeciesInput == 'SAT' || tSpeciesInput == 'PSAT') && (tReadScoreInput != '' && tMathScoreInput != '' && +tReadScoreInput + +tMathScoreInput != +tScoreInput))) {
        alert('Score not possible');
    } else if (tScoreInput == '' || (tReadScoreInput == '' && tMathScoreInput != '') || (tReadScoreInput != '' && tMathScoreInput == '')) {
        alert('Enter the test score');
    } else if (tSubSpeciesInput.length > 80) {
        alert('Subject title is too long');
    } else if (tSubSpeciesInput == '' && tSpeciesInput == 'AP') {
        alert('Enter the course');
    } else if (tSpeciesOtherInput.length > 80) {
        alert('Test name is too long');
    } else if (tSpeciesOtherInput == '' && tSpeciesInput == 'Other') {
        alert('Enter the test name');
    } else {
        let test = document.createElement('li');
        test.className = 'item test';
        test.id = 'T' + Math.floor(100000000 + Math.random() * 900000000);

        test.score = tScoreInput;
        test.readScore = tReadScoreInput;
        test.mathScore = tMathScoreInput;

        let div = document.createElement('div');
        div.className = 'attr testScore';
        div.id = test.id + 'Score';
        let t = document.createTextNode(test.score);
        div.appendChild(t);
        test.appendChild(div);

        test.species = tSpeciesInput;
        test.subSpecies = tSubSpeciesInput;
        test.speciesOther = tSpeciesOtherInput;

        test.year = tYearInput;
        if (tMonthInput.length == 1) {
            test.month = '0' + tMonthInput;
        } else {
            test.month = tMonthInput;
        }

        t = `${test.species} (${test.month} ${test.year})`;
        if (test.species == 'AP') {
            t = `${test.species} ${test.subSpecies} (${test.month} ${test.year})`;
        } else if (test.species == 'Other') {
            t = `${test.speciesOther} (${test.month} ${test.year})`;
        }
        let span = document.createElement('span');
        span.id = test.id + 'Text';
        span.appendChild(document.createTextNode(t));
        test.appendChild(span);

        test.name = t;

        if (test.species == 'SAT' || test.species == 'PSAT') {
            if (test.readScore != '' && test.mathScore != '') {
                div = document.createElement('div');
                div.className = 'testReadScore';
                div.id = test.id + 'ReadScore';
                t = document.createTextNode('Reading: ' + test.readScore);
                div.appendChild(t);
                test.appendChild(div);

                div = document.createElement('div');
                div.className = 'testMathScore';
                div.id = test.id + 'MathScore';
                t = document.createTextNode('Math: ' + test.mathScore);
                div.appendChild(t);
                test.appendChild(div);
            }
        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit test';
        btn.title = 'Edit test';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove test';
        btn.title = 'Remove test';
        btn.appendChild(icon);
        div.appendChild(btn);

        test.appendChild(div);

        localStorage.setItem(test.id + 'Species', test.species);
        localStorage.setItem(test.id + 'SubSpecies', test.subSpecies);
        localStorage.setItem(test.id + 'SpeciesOther', test.speciesOther);
        localStorage.setItem(test.id + 'Month', test.month);
        localStorage.setItem(test.id + 'Year', test.year);
        localStorage.setItem(test.id + 'Score', test.score);
        localStorage.setItem(test.id + 'ReadingScore', test.readScore);
        localStorage.setItem(test.id + 'MathScore', test.mathScore);
        localStorage.setItem(test.id + 'Name', test.name);

        document.getElementById('listTests').appendChild(test);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        hide();
    }
})

document.getElementById('addEssayBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let ePromptInput = document.getElementById('essayPrompt').value.trim();
    let eEssayTextInput = document.getElementById('essayText').value.trim();

    if (ePromptInput.length > 400) {
        alert('Prompt is too long');
    } else if (eEssayTextInput.length > 100000) {
        alert('Essay is too long');
    } else if (ePromptInput == '') {
        alert('Enter the prompt for your essay');
    } else if (eEssayTextInput == '') {
        alert('Enter your essay');
    } else {
        let essay = document.createElement('li');
        essay.className = 'item essay';
        essay.prompt = ePromptInput;
        essay.name = ePromptInput;

        essay.id = 'E' + Math.floor(100000000 + Math.random() * 900000000);

        let i = document.createElement('i');
        i.id = essay.id + 'EssayI';
        i.className = 'essayI fa-solid fa-paperclip';
        i.ariaLabel = 'Essay icon';
        essay.appendChild(i);

        let t = document.createTextNode(essay.prompt);
        let span = document.createElement('span');
        span.id = essay.id + 'Prompt';
        span.appendChild(t);
        essay.appendChild(span);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit essay';
        btn.title = 'Edit essay';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove essay';
        btn.title = 'Remove essay';
        btn.appendChild(icon);
        div.appendChild(btn);

        essay.appendChild(div);

        essay.essayTeaser = eEssayTextInput.substr(0, 100) + '...';
        span = document.createElement('span');
        span.className = 'essayTeaser';
        span.id = essay.id + 'EssayTeaser';
        t = document.createTextNode(essay.essayTeaser);
        span.appendChild(t);
        essay.appendChild(span);

        essay.essayText = eEssayTextInput;
        span = document.createElement('span');
        span.className = 'essayText hidden';
        span.id = essay.id + 'EssayText';
        span.innerText = essay.essayText;
        essay.appendChild(span);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-chevron-down mr-2';
        icon.id = essay.id + 'ExpandEI'
        btn.className = 'expEBtn';
        btn.id = essay.id + 'ExpandEBtn';
        btn.appendChild(icon);
        span = document.createElement('span');
        span.id = essay.id + 'ExpandEBtnText';
        t = document.createTextNode('Expand essay');
        span.appendChild(t);
        btn.appendChild(span);
        essay.appendChild(btn);

        essay.wordCount = countWords(essay.essayText);
        span = document.createElement('span');
        span.className = 'wordCount';
        span.id = essay.id + 'WordCount';
        t = document.createTextNode(essay.wordCount + ' words');
        span.appendChild(t);
        essay.appendChild(span);

        localStorage.setItem(essay.id + 'Name', essay.name);
        localStorage.setItem(essay.id + 'Prompt', essay.prompt);
        localStorage.setItem(essay.id + 'EssayText', essay.essayText);
        localStorage.setItem(essay.id + 'EssayTeaser', essay.essayTeaser);
        localStorage.setItem(essay.id + 'WordCount', essay.wordCount);

        document.getElementById('listEssays').appendChild(essay);

        document.getElementById('essayWordCount').innerText = '0';

        let expEBtn = document.getElementsByClassName('expEBtn');
        for (i = 0; i < expEBtn.length; i++) {
            expEBtn[i].onclick = function () {
                toggleEssay(this.parentElement.id);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        hide();
    }
})

document.getElementById('addConnectionBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let oNameInput = document.getElementById('connectionName').value.trim();
    let oRelationInput = document.getElementById('connectionRelation').value.trim();
    let oContactMethodsList = [];
    for (let i = 0; i < document.getElementById('connectionContactMethodsList').getElementsByTagName('li').length; i++) {
        oContactMethodsList.push(document.getElementById('connectionContactMethodsList').getElementsByTagName('li')[i].getElementsByTagName('span')[0].innerText);
    }

    if (oNameInput.length > 100) {
        alert('Name is too long');
    } else if (oRelationInput.length > 100) {
        alert('Relation is too long');
    } else if (oNameInput == '') {
        alert('Enter the name of this connection');
    } else if (oRelationInput == '') {
        alert('Enter the relation of this connection');
    } else {
        let connection = document.createElement('li');
        connection.className = 'item connection';
        connection.name = oNameInput;
        connection.relation = oRelationInput;
        connection.contactsList = oContactMethodsList;

        connection.id = 'O' + Math.floor(100000000 + Math.random() * 900000000);

        let i = document.createElement('i');
        i.id = connection.id + 'ConnectionI';
        i.className = 'connectionI fa-solid fa-user-large';
        i.ariaLabel = 'Connection icon';
        connection.appendChild(i);

        let t = document.createTextNode(connection.name);
        let span = document.createElement('span');
        span.id = connection.id + 'Name';
        span.className = 'connectionName';
        span.appendChild(t);
        connection.appendChild(span);

        t = document.createTextNode(connection.relation);
        span = document.createElement('span');
        span.id = connection.id + 'Relation';
        span.className = 'connectionRelation';
        span.appendChild(t);
        connection.appendChild(span);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit connection';
        btn.title = 'Edit connection';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'optI fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove connection';
        btn.title = 'Remove connection';
        btn.appendChild(icon);
        div.appendChild(btn);

        connection.appendChild(div);

        let ul = document.createElement('ul');
        ul.className = 'connectionContactsList';
        ul.id = connection.id + 'ContactsList';
        for (i = 0; i < connection.contactsList.length; i++) {
            console.log(connection.contactsList[i]);
            li = document.createElement('li');
            li.className = 'connectionContactItem';
            li.id = connection.id + 'ContactItem';

            // maybe have icons for phone #s or emails or other

            // put "work" or "personal" next to the contact info, on the right of it in a smaller gray subtext

            span = document.createElement('span');
            span.className = 'connectionContactItemSpan';
            span.id = connection.id + 'ContactItemSpan';
            span.innerText = connection.contactsList[i];
            li.appendChild(span);

            ul.appendChild(li);
        }
        connection.appendChild(ul);

        localStorage.setItem(connection.id + 'Name', connection.name);
        localStorage.setItem(connection.id + 'Relation', connection.relation);
        localStorage.setItem(connection.id + 'ContactsList', connection.contactsList);

        document.getElementById('listConnections').appendChild(connection);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        hide();
    }
})

let expEBtn = document.getElementsByClassName('expEBtn');
for (i = 0; i < expEBtn.length; i++) {
    expEBtn[i].onclick = function () {
        toggleEssay(this.parentElement.id);
    }
}

let pen = document.getElementsByClassName('pen');
for (i = 0; i < pen.length; i++) {
    pen[i].onclick = function () {
        if (this.parentElement.parentElement.id.startsWith('C')) {
            clickPen(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('A')) {
            clickPenAct(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('T')) {
            clickPenTest(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('E')) {
            clickPenEssay(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('O')) {
            clickPenConnection(this.parentElement.parentElement);
        }
    }
}

let trash = document.getElementsByClassName('trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
    }
}

function clickPen(c) {
    getCourses();

    course = c;

    document.getElementById('courseTitleEdit').value = course.name;
    document.getElementById('selGradeLevEdit').value = course.gradeLevel;
    document.getElementById('selSubjectEdit').value = course.sub;
    document.getElementById('selDiffEdit').value = course.diff;
    document.getElementById('selDiff2Edit').value = course.diff2;

    if (course.grade && course.grade.includes('%')) {
        document.getElementById('selLetterGradeEdit').value = 'Use percent';
        document.getElementById('percentGradeEdit').value = course.grade.replace('%', '').replace('- ', '').replace('+ ', '').replace('A', '').replace('B', '').replace('C', '').replace('D', '').replace('F', '').replace(' ', '');
        document.getElementById('percentGradeEdit').classList.remove('hidden');
    } else if (course.grade) {
        document.getElementById('selLetterGradeEdit').value = course.grade;
    } else {
        document.getElementById('selLetterGradeEdit').value = 'none';
    }

    if (course.grade2 && course.grade2.includes('%')) {
        document.getElementById('selLetterGrade2Edit').value = 'Use percent';
        document.getElementById('percentGrade2Edit').value = course.grade2.replace('%', '').replace('- ', '').replace('+ ', '').replace('A', '').replace('B', '').replace('C', '').replace('D', '').replace('F', '').replace(' ', '');
        document.getElementById('percentGrade2Edit').classList.remove('hidden');
    } else if (course.grade2) {
        document.getElementById('selLetterGrade2Edit').value = course.grade2;
    } else {
        document.getElementById('selLetterGrade2Edit').value = 'none';
    }

    if (course.diff2 != 1) {
        document.getElementById('advOptEditCI').classList.add('rotate-90');
        document.getElementById('advOptionsEditC').classList.remove('hidden');
    }

    document.getElementById('editCourseModal').classList.remove('fadeIn');
    document.getElementById('editCourseModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickPenAct(a) {
    getActs();

    activity = a;

    document.getElementById('actTitleEdit').value = activity.name;
    document.getElementById('actDescEdit').value = activity.desc;
    document.getElementById('selActCategoryEdit').value = activity.category;
    if (activity.strength == null) {
        activity.strength = 1;
        localStorage.setItem(activity.id + 'Strength', activity.strength);
    }
    document.getElementById('selStrengthEdit').value = activity.strength;

    document.getElementById('editActModal').classList.remove('fadeIn');
    document.getElementById('editActModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickPenTest(t) {
    getTests();

    test = t;

    document.getElementById('selTestSpeciesEdit').value = test.species;
    document.getElementById('testSubSpeciesEdit').value = test.subSpecies;
    document.getElementById('testSpeciesOtherEdit').value = test.speciesOther;
    document.getElementById('testMonthEdit').value = test.month;
    document.getElementById('testYearEdit').value = test.year;
    document.getElementById('testScoreEdit').value = test.score;
    document.getElementById('readingTestScoreEdit').value = test.readScore;
    document.getElementById('mathTestScoreEdit').value = test.mathScore;

    if (document.getElementById('selTestSpeciesEdit').value == 'AP') {
        document.getElementById('testSubSpeciesEdit').classList.remove('hidden');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'SAT' || document.getElementById('selTestSpeciesEdit').value == 'PSAT') {
        document.getElementById('testSubScoreDivEdit').classList.remove('hidden');
        document.getElementById('testSubScoreDivEdit').classList.add('flex');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'Other') {
        document.getElementById('testSpeciesOtherEdit').classList.remove('hidden');
    }

    document.getElementById('editTestModal').classList.remove('fadeIn');
    document.getElementById('editTestModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickPenEssay(e) {
    getEssays();

    essay = e;

    document.getElementById('essayPromptEdit').value = essay.prompt;
    document.getElementById('essayTextEdit').value = essay.essayText;
    document.getElementById('essayWordCountEdit').innerText = countWords(essay.essayText);

    document.getElementById('editEssayModal').classList.remove('fadeIn');
    document.getElementById('editEssayModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickPenConnection(o) {
    getConnections();

    connection = o;

    document.getElementById('connectionNameEdit').value = connection.name;
    document.getElementById('connectionRelationEdit').value = connection.relation;
    //document.getElementById('essayWordCountEdit').innerText = connection.contactsList;
    //CONVERT ARRAY TO THE CONTACTS THING IN THE MODAL

    document.getElementById('editConnectionModal').classList.remove('fadeIn');
    document.getElementById('editConnectionModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickTrash(el) {
    getCourses();
    getActs();
    getTests();

    if (confirm('Are you sure you want to remove \"' + el.name + '\"?')) {
        el.remove();

        calcListDiff();
        calcGPA();
        calcCumGPA();
        calcCumDiff();
        calcECStrength();
        saveLists();
    }
}

document.getElementById('saveCourseBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let cTitleInput = document.getElementById('courseTitleEdit').value.trim();
    let cLetterGradeInput = document.getElementById('selLetterGradeEdit').value;
    let cPercentGradeInput = document.getElementById('percentGradeEdit').value;
    let cLetterGrade2Input = document.getElementById('selLetterGrade2Edit').value;
    let cPercentGrade2Input = document.getElementById('percentGrade2Edit').value;

    if (cTitleInput.length > 80) {
        alert('Course title is too long');
    } else if (cTitleInput == '') {
        alert('Enter the title of your course');
    } else if ((cPercentGradeInput != '' && (Number(cPercentGradeInput) > 100 || Number(cPercentGradeInput) < 0)) || (cPercentGrade2Input != '' && (Number(cPercentGrade2Input) > 100 || Number(cPercentGrade2Input) < 0))) {
        alert('Grade not possible');
    } else {
        if (course.gradeLevel != document.getElementById('selGradeLevEdit').value) {
            course.gradeLevel = document.getElementById('selGradeLevEdit').value;
            document.getElementById('list' + course.gradeLevel).appendChild(course.cloneNode(true));

            course.remove();
        }

        course.oldName = course.name;
        course.name = cTitleInput;
        course.sub = document.getElementById('selSubjectEdit').value;
        course.diff = document.getElementById('selDiffEdit').value;
        course.diff2 = document.getElementById('selDiff2Edit').value;
        course.diffFull = course.diff * course.diff2;

        if (course.sub == 'PE') {
            course.diffFull = course.diffFull * 0.01;
        }

        if (cLetterGradeInput == 'Use percent') {
            letter = getLetter(cPercentGradeInput);
            course.grade = letter + ' ' + ((Math.round((cPercentGradeInput) * 100)) / 100) + '%';
        } else {
            course.grade = cLetterGradeInput;
        }

        if (cLetterGrade2Input == 'Use percent') {
            letter = getLetter(cPercentGrade2Input);
            course.grade2 = letter + ' ' + ((Math.round((cPercentGrade2Input) * 100)) / 100) + '%';
        } else {
            course.grade2 = cLetterGrade2Input;
        }

        if (!document.getElementById(course.id + 'Grade2')) {
            div = document.createElement('div');
            div.id = course.id + 'Grade2';
            t = document.createTextNode(course.grade2);
            div.className = 'attr grade';
            if (course.grade2 == 'none') {
                div.classList.add('hidden');
            }
            div.appendChild(t);

            document.getElementById(course.id + 'Grade').parentNode.insertBefore(div, document.getElementById(course.id + 'Grade').nextSibling);
        }

        if (!document.getElementById(course.id + 'Text')) {
            document.getElementById(course.id).innerHTML = document.getElementById(course.id).innerHTML.replace(course.oldName, '');

            t = document.createTextNode(course.name);
            span = document.createElement('span');
            span.id = course.id + 'Text';
            span.appendChild(t);

            document.getElementById(course.id).insertBefore(span, document.getElementById(course.id + 'Diff'));
        }

        document.getElementById(course.id + 'Grade').innerText = course.grade;
        document.getElementById(course.id + 'Grade2').innerText = course.grade2;
        document.getElementById(course.id + 'Text').innerText = course.name;
        document.getElementById(course.id + 'Diff').innerText = course.diff;

        [diffText, diffClass] = getDiff(course.diff);
        document.getElementById(course.id + 'Diff').className = diffClass;
        document.getElementById(course.id + 'Diff').innerText = diffText;

        document.getElementById(course.id + 'Grade').className = 'attr grade';
        document.getElementById(course.id + 'Grade2').className = 'attr grade';
        if (course.grade == 'none') {
            document.getElementById(course.id + 'Grade').classList.add('hidden');
        }
        if (course.grade2 == 'none') {
            document.getElementById(course.id + 'Grade2').classList.add('hidden');
        }

        if (document.getElementById(course.id + 'Diff2') == null || document.getElementById(course.id + 'Diff2') == 'undefined') {
            div = document.createElement('div');
            div.id = course.id + 'Diff2';
            diff2Class = getDiff2(course.diff2);
            div.className = diff2Class;
            course.appendChild(div);
        } else {
            diff2Class = getDiff2(course.diff2);
            document.getElementById(course.id + 'Diff2').className = diff2Class;
        }

        localStorage.setItem(course.id + 'Name', course.name);
        localStorage.setItem(course.id + 'GradeLevel', course.gradeLevel);
        localStorage.setItem(course.id + 'Sub', course.sub);
        localStorage.setItem(course.id + 'Diff', course.diff);
        localStorage.setItem(course.id + 'Diff2', course.diff2);
        localStorage.setItem(course.id + 'DiffFull', course.diffFull);
        localStorage.setItem(course.id + 'Grade', course.grade);
        localStorage.setItem(course.id + 'Grade2', course.grade2);

        saveLists();
        getLists();
        getCourses();
        calcListDiff();
        calcGPA();
        calcCumGPA();
        calcCumDiff();

        let expEBtn = document.getElementsByClassName('expEBtn');
        for (i = 0; i < expEBtn.length; i++) {
            expEBtn[i].onclick = function () {
                toggleEssay(this.parentElement.id);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        hide();
    }
})

document.getElementById('saveActBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let aTitleInput = document.getElementById('actTitleEdit').value.trim();
    let aDescInput = document.getElementById('actDescEdit').value.trim();
    let aCategoryInput = document.getElementById('selActCategoryEdit').value;
    let aStrengthInput = document.getElementById('selStrengthEdit').value;

    if (aTitleInput.length > 180) {
        alert('Actvity title is too long');
    } else if (aDescInput.length > 400) {
        alert('Actvity description is too long');
    } else if (aTitleInput == '') {
        alert('Enter the title of your activity');
    } else {
        if (activity.strength != aStrengthInput) {
            activity.strength = aStrengthInput;
            if (activity.strength == 1) {
                document.getElementById('listActs').appendChild(activity.cloneNode(true));
            } else {
                document.getElementById('listActs' + activity.strength).appendChild(activity.cloneNode(true));
            }
            activity.remove();
        }

        activity.name = aTitleInput;
        activity.desc = aDescInput;
        activity.category = aCategoryInput;
        activity.strength = aStrengthInput;

        if (!document.getElementById(activity.id + 'Text')) {
            document.getElementById(activity.id).innerHTML = document.getElementById(activity.id).innerHTML.replace(activity.name, '');

            t = document.createTextNode(activity.name);
            span = document.createElement('span');
            span.id = activity.id + 'Text';
            span.appendChild(t);

            document.getElementById(activity.id).insertBefore(span, document.getElementById(activity.id + 'ActI').nextSibling);
        }

        document.getElementById(activity.id + 'ActI').className = getActIcon(activity.category);
        document.getElementById(activity.id + 'ActI').ariaLabel = activity.category;
        document.getElementById(activity.id + 'Text').innerText = activity.name;

        if (!document.getElementById(activity.id + 'Desc')) {
            if (activity.desc == null) activity.desc = '';
            t = document.createTextNode(activity.desc);
            span = document.createElement('span');
            span.className = 'desc';
            span.id = activity.id + 'Desc';
            span.appendChild(t);

            document.getElementById(activity.id).insertBefore(span, document.getElementById(activity.id).getElementsByClassName('optDiv')[0].nextSibling);
        }

        if (activity.desc != null && activity.desc != '') {
            document.getElementById(activity.id + 'Desc').innerText = activity.desc;
            document.getElementById(activity.id + 'Desc').classList.remove('hidden');
        } else {
            document.getElementById(activity.id + 'Desc').innerText = '';
            document.getElementById(activity.id + 'Desc').classList.add('hidden');
        }

        localStorage.setItem(activity.id + 'Name', activity.name);
        localStorage.setItem(activity.id + 'Desc', activity.desc);
        localStorage.setItem(activity.id + 'Category', activity.category);
        localStorage.setItem(activity.id + 'Strength', activity.strength);

        saveLists();
        getLists();
        getActs();
        calcECStrength();

        let expEBtn = document.getElementsByClassName('expEBtn');
        for (i = 0; i < expEBtn.length; i++) {
            expEBtn[i].onclick = function () {
                toggleEssay(this.parentElement.id);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        hide();
    }
})

document.getElementById('saveTestBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let tSpeciesInput = document.getElementById('selTestSpeciesEdit').value;
    let tSubSpeciesInput = document.getElementById('testSubSpeciesEdit').value.trim();
    let tSpeciesOtherInput = document.getElementById('testSpeciesOtherEdit').value.trim();
    let tMonthInput = document.getElementById('testMonthEdit').value;
    let tYearInput = document.getElementById('testYearEdit').value;
    let tScoreInput = document.getElementById('testScoreEdit').value;
    let tReadScoreInput = document.getElementById('readingTestScoreEdit').value;
    let tMathScoreInput = document.getElementById('mathTestScoreEdit').value;

    if (tMonthInput < 1 || tMonthInput > 12) {
        alert('Enter a valid month 1-12');
    } else if (tYearInput < 1900 || tYearInput > currentYear + 10) {
        alert('Enter a valid year');
    } else if (tScoreInput < 0 || tScoreInput > 9999 || tReadScoreInput < 0 || tMathScoreInput < 0 || ((tSpeciesInput == 'SAT' || tSpeciesInput == 'PSAT') && (tReadScoreInput != '' && tMathScoreInput != '' && +tReadScoreInput + +tMathScoreInput != +tScoreInput))) {
        alert('Score not possible');
    } else if (tScoreInput == '' || (tReadScoreInput == '' && tMathScoreInput != '') || (tReadScoreInput != '' && tMathScoreInput == '')) {
        alert('Enter the test score');
    } else if (tSubSpeciesInput.length > 80) {
        alert('Subject title is too long');
    } else if (tSubSpeciesInput == '' && tSpeciesInput == 'AP') {
        alert('Enter the course');
    } else if (tSpeciesOtherInput.length > 80) {
        alert('Test name is too long');
    } else if (tSpeciesOtherInput == '' && tSpeciesInput == 'Other') {
        alert('Enter the test name');
    } else {
        test = document.getElementById(test.id);

        if (tMonthInput.length == 1) {
            test.month = '0' + tMonthInput;
        } else {
            test.month = tMonthInput;
        }
        test.year = tYearInput;
        test.score = tScoreInput;
        test.readScore = tReadScoreInput;
        test.mathScore = tMathScoreInput;
        test.species = tSpeciesInput;
        test.subSpecies = tSubSpeciesInput;
        test.speciesOther = tSpeciesOtherInput;

        if (!document.getElementById(test.id + 'Text')) {
            document.getElementById(test.id).innerHTML = document.getElementById(test.id).innerHTML.replace(test.name, '');

            t = document.createTextNode(test.name);
            span = document.createElement('span');
            span.id = test.id + 'Text';
            span.appendChild(t);

            document.getElementById(test.id).insertBefore(span, document.getElementById(test.id + 'Score').nextSibling);
        }

        document.getElementById(test.id + 'Score').innerText = test.score;
        test.name = `${test.species} (${test.month} ${test.year})`;
        if (test.species == 'AP') {
            document.getElementById(test.id + 'Text').innerText = `${test.species} ${test.subSpecies} (${test.month} ${test.year})`;
            test.name = `${test.species} ${test.subSpecies} (${test.month} ${test.year})`;
        } else if (test.species == 'SAT' || test.species == 'PSAT') {
            test.innerHTML = `<div class='attr testScore' id='${test.id}Score'>${test.score}</div><span class='${course.id}Text'>${test.species} (${test.month} ${test.year})</span><div class='testReadScore' id='${test.id}ReadScore'>Reading: ${test.readScore}</div><div class='testMathScore' id='${test.id}MathScore'>Math: ${test.mathScore}</div>`;
            if (test.readScore == '' && test.mathScore == '') {
                document.getElementById(test.id + 'Text').innerText = `${test.species} (${test.month} ${test.year})`;
            }
        } else if (test.species == 'Other') {
            document.getElementById(test.id + 'Text').innerText = `${test.speciesOther} (${test.month} ${test.year})`;
            test.name = `${test.speciesOther} (${test.month} ${test.year})`;
        } else {
            document.getElementById(test.id + 'Text').innerText = `${test.species} (${test.month} ${test.year})`;
        }

        if ((test.species == 'SAT' || test.species == 'PSAT') && !(test.readScore == '' && test.mathScore == '')) {
            div = document.createElement('div');
            div.className = 'optDiv';

            let btn = document.createElement('button');
            icon = document.createElement('i');
            icon.className = 'optI fa-solid fa-pen';
            btn.className = 'opt pen';
            btn.ariaLabel = 'Edit test';
            btn.title = 'Edit test';
            btn.appendChild(icon);
            div.appendChild(btn);

            btn = document.createElement('button');
            icon = document.createElement('i');
            icon.className = 'optI fa-solid fa-trash';
            btn.className = 'opt trash';
            btn.ariaLabel = 'Remove test';
            btn.title = 'Remove test';
            btn.appendChild(icon);
            div.appendChild(btn);

            test.appendChild(div);
        }

        localStorage.setItem(test.id + 'Species', test.species);
        localStorage.setItem(test.id + 'SubSpecies', test.subSpecies);
        localStorage.setItem(test.id + 'SpeciesOther', test.speciesOther);
        localStorage.setItem(test.id + 'Month', test.month);
        localStorage.setItem(test.id + 'Year', test.year);
        localStorage.setItem(test.id + 'Score', test.score);
        localStorage.setItem(test.id + 'ReadingScore', test.readScore);
        localStorage.setItem(test.id + 'MathScore', test.mathScore);
        localStorage.setItem(test.id + 'Name', test.name);

        saveLists();
        getLists();
        getTests();

        let expEBtn = document.getElementsByClassName('expEBtn');
        for (i = 0; i < expEBtn.length; i++) {
            expEBtn[i].onclick = function () {
                toggleEssay(this.parentElement.id);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        hide();
    }
})

document.getElementById('saveEssayBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let ePromptInput = document.getElementById('essayPromptEdit').value.trim();
    let eEssayTextInput = document.getElementById('essayTextEdit').value.trim();

    if (ePromptInput.length > 400) {
        alert('Prompt is too long');
    } else if (eEssayTextInput.length > 100000) {
        alert('Essay is too long');
    } else if (ePromptInput == '') {
        alert('Enter the prompt for your essay');
    } else if (eEssayTextInput == '') {
        alert('Enter your essay');
    } else {
        essay.prompt = ePromptInput;
        essay.name = ePromptInput;
        essay.essayText = eEssayTextInput;
        essay.essayTeaser = eEssayTextInput.substr(0, 150) + '...';
        essay.wordCount = countWords(essay.essayText);

        document.getElementById(essay.id + 'Prompt').innerText = essay.prompt;
        document.getElementById(essay.id + 'EssayText').innerText = essay.essayText;
        document.getElementById(essay.id + 'EssayTeaser').innerText = essay.essayTeaser;
        document.getElementById(essay.id + 'WordCount').innerText = essay.wordCount + ' words';

        localStorage.setItem(essay.id + 'Name', essay.name);
        localStorage.setItem(essay.id + 'Prompt', essay.prompt);
        localStorage.setItem(essay.id + 'EssayText', essay.essayText);
        localStorage.setItem(essay.id + 'EssayTeaser', essay.essayTeaser);
        localStorage.setItem(essay.id + 'WordCount', essay.wordCount);

        saveLists();
        getLists();
        getEssays();

        document.getElementById('essayWordCount').innerText = '0';

        let expEBtn = document.getElementsByClassName('expEBtn');
        for (i = 0; i < expEBtn.length; i++) {
            expEBtn[i].onclick = function () {
                toggleEssay(this.parentElement.id);
            }
        }

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        hide();
    }
})

document.getElementById('saveConnectionBtn').addEventListener('click', function (event) {
    event.preventDefault();

    let oNameInput = document.getElementById('connectionNameEdit').value.trim();
    let oRelationInput = document.getElementById('connectionRelationEdit').value.trim();
    let oContactMethodsList = [];
    for (let i = 0; i < document.getElementById('connectionContactMethodsListEdit').getElementsByTagName('li').length; i++) {
        oContactMethodsList.push(document.getElementById('connectionContactMethodsListEdit').getElementsByTagName('li')[i].innerText);
    }

    if (oNameInput.length > 100) {
        alert('Name is too long');
    } else if (oRelationInput.length > 100) {
        alert('Relation is too long');
    } else if (oNameInput == '') {
        alert('Enter the name of this connection');
    } else if (oRelationInput == '') {
        alert('Enter the relation of this connection');
    } else {
        connection.name = oNameInput;
        connection.relation = oRelationInput;
        connection.contactsList = oContactMethodsList;

        document.getElementById(connection.id + 'Name').innerText = connection.name;
        document.getElementById(connection.id + 'Relation').innerText = connection.relation;
        //document.getElementById(connection.id + 'ContactsList').innerText = essay.essayTeaser;


        localStorage.setItem(essay.id + 'Name', connection.name);
        localStorage.setItem(essay.id + 'Relation', connection.relation);
        localStorage.setItem(essay.id + 'ContactsList', connection.contactsList);

        saveLists();
        getLists();
        getConnections();

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('E')) {
                    clickPenEssay(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('O')) {
                    clickPenConnection(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        hide();
    }
})

document.getElementById('saveDateBtn').addEventListener('click', function (event) {
    event.preventDefault();

    gradDay = Number(document.getElementById('gradDay').value);
    gradMonth = Number(document.getElementById('gradMonth').value);
    gradYear = Number(document.getElementById('gradYear').value);
    gradDate = new Date(gradYear, gradMonth - 1, gradDay);

    if (gradDay == '' && gradMonth == '' && gradYear == '') {
        localStorage.setItem('gradDate', gradDate);
        localStorage.setItem('gradDay', gradDay);
        localStorage.setItem('gradMonth', gradMonth);
        localStorage.setItem('gradYear', gradYear);

        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half'></i>`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'>Edit countdown</i>`;

        hide();

    } else if (gradDay < 1 || gradDay > 31) {
        alert('Enter a valid day 1-31');
    } else if (gradMonth < 1 || gradMonth > 12) {
        alert('Enter a valid month 1-12');
    } else if (gradYear > currentYear + 8) {
        alert('Enter a valid year');
    } else if (gradDate < currentDate) {
        alert('Enter a date in the future');
    } else if (gradDay == currentDay && gradMonth == currentMonth && gradYear == currentYear) {
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        hide();
    } else {
        localStorage.setItem('gradDate', gradDate);
        localStorage.setItem('gradDay', gradDay);
        localStorage.setItem('gradMonth', gradMonth);
        localStorage.setItem('gradYear', gradYear);

        let countdown = Math.round(Math.abs((gradDate - currentDate) / oneDay));
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;

        hide();
    }
})

document.getElementById('saveWeightsBtn').addEventListener('click', function (event) {
    event.preventDefault();

    advWeight = Number(document.getElementById('advWeightInp').value);
    colWeight = Number(document.getElementById('colWeightInp').value);
    honWeight = Number(document.getElementById('honWeightInp').value);
    apWeight = Number(document.getElementById('apWeightInp').value);
    ibWeight = Number(document.getElementById('ibWeightInp').value);

    if (advWeight < 0 || advWeight > 2 || colWeight < 0 || colWeight > 2 || honWeight < 0 || honWeight > 2 || apWeight < 0 || apWeight > 2 || ibWeight < 0 || ibWeight > 2) {
        alert('Weights must be between zero and two');
    } else {
        localStorage.setItem('advWeight', advWeight);
        localStorage.setItem('colWeight', colWeight);
        localStorage.setItem('honWeight', honWeight);
        localStorage.setItem('apWeight', apWeight);
        localStorage.setItem('ibWeight', ibWeight);

        if (document.getElementById('plusMinusSwitch').checked) {
            plusMinus = true;
        } else {
            plusMinus = false;
        }

        localStorage.setItem('gpaPlusMinus', plusMinus);

        calcGPA();
        calcCumGPA();
        hide();
    }
})

document.getElementById('randomPromptBtn').addEventListener('click', function (event) {
    event.preventDefault();

    randomPrompt = promptList[Math.floor(Math.random() * promptList.length)];
    document.getElementById('essayPrompt').value = randomPrompt;
})

function getCD() {
    gradDay = Number(localStorage.getItem('gradDay', gradDay));
    gradMonth = Number(localStorage.getItem('gradMonth', gradMonth));
    gradYear = Number(localStorage.getItem('gradYear', gradYear));
    gradDate = new Date(localStorage.getItem('gradDate'));

    if (gradDay == currentDay && gradMonth == currentMonth && gradYear == currentYear) {
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        hide();
    } else if (gradDate != NaN && gradDate != null && gradDate > currentDate) {
        let countdown = Math.round(Math.abs((gradDate - currentDate) / oneDay));
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
    } else {
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>Edit countdown`;
    }
}

function getCourses() { // gets all stored info of each course
    for (let i = 9; i <= 13; i++) {
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];

            course.name = localStorage.getItem(course.id + 'Name');
            course.gradeLevel = localStorage.getItem(course.id + 'GradeLevel');
            course.sub = localStorage.getItem(course.id + 'Sub');
            course.diff = localStorage.getItem(course.id + 'Diff');
            course.diff2 = localStorage.getItem(course.id + 'Diff2');
            course.diffFull = localStorage.getItem(course.id + 'DiffFull');
            course.grade = localStorage.getItem(course.id + 'Grade');
            if (localStorage.getItem(course.id + 'Grade2') != null) {
                course.grade2 = localStorage.getItem(course.id + 'Grade2');
            } else {
                course.grade2 = 'none';
                localStorage.setItem(course.id + 'Grade2', course.grade2);
            }
        }
    }
}

function getActs() { // gets all stored info of each activity
    for (let i = 1; i <= 3; i++) {
        let currentItems;
        if (i == 1) {
            currentItems = document.getElementById('listActs').getElementsByTagName('li');
        } else {
            currentItems = document.getElementById('listActs' + i).getElementsByTagName('li');
        }

        for (let j = 0; j < currentItems.length; j++) {
            activity = currentItems[j];
            activity.name = localStorage.getItem(activity.id + 'Name');
            activity.desc = localStorage.getItem(activity.id + 'Desc');
            activity.category = localStorage.getItem(activity.id + 'Category');
            activity.strength = localStorage.getItem(activity.id + 'Strength');
        }
    }
}

function getTests() { // gets all stored info of each test
    let currentItems = document.getElementById('listTests').getElementsByTagName('li');

    for (let j = 0; j < currentItems.length; j++) {
        test = currentItems[j];
        test.species = localStorage.getItem(test.id + 'Species');
        test.subSpecies = localStorage.getItem(test.id + 'SubSpecies');
        test.speciesOther = localStorage.getItem(test.id + 'SpeciesOther');
        test.month = localStorage.getItem(test.id + 'Month');
        test.year = localStorage.getItem(test.id + 'Year');
        test.score = localStorage.getItem(test.id + 'Score');
        test.readScore = localStorage.getItem(test.id + 'ReadingScore');
        test.mathScore = localStorage.getItem(test.id + 'MathScore');
        test.name = localStorage.getItem(test.id + 'Name');
    }
}

function getEssays() { // gets all stored info of each essay
    let currentItems = document.getElementById('listEssays').getElementsByTagName('li');

    for (let j = 0; j < currentItems.length; j++) {
        essay = currentItems[j];
        essay.name = localStorage.getItem(essay.id + 'Name');
        essay.prompt = localStorage.getItem(essay.id + 'Prompt');
        essay.essayText = localStorage.getItem(essay.id + 'EssayText');
    }
}

function getConnections() { // gets all stored info of each connection
    let currentItems = document.getElementById('listConnections').getElementsByTagName('li');

    for (let j = 0; j < currentItems.length; j++) {
        connection = currentItems[j];
        connection.name = localStorage.getItem(connection.id + 'Name');
        connection.relation = localStorage.getItem(connection.id + 'Relation');
        connection.contactsList = localStorage.getItem(connection.id + 'ContactsList');
    }
}

function calcListDiff() { // calcs diffs of ALL lists
    for (let i = 9; i <= 13; i++) {
        let sum = 0;
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];

            if (document.getElementById(course.id + 'Diff').innerText == 'IB') {
                course.diff = 5;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'AP') {
                course.diff = 4;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'Honors') {
                course.diff = 3;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'College') {
                course.diff = 3.5;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'Advanced') {
                course.diff = 2;
            } else {
                course.diff = 1;
            }

            if (document.getElementById(course.id + 'Diff2') == null || document.getElementById(course.id + 'Diff2') == 'undefined') {
                div = document.createElement('div');
                div.id = course.id + 'Diff2';
                div.className = 'normal';
                course.appendChild(div);
            }

            if (document.getElementById(course.id + 'Diff2').className.includes('challenging')) {
                course.diff2 = 1.75;
            } else if (document.getElementById(course.id + 'Diff2').className.includes('difficult')) {
                course.diff2 = 1.5;
            } else if (document.getElementById(course.id + 'Diff2').className.includes('easy')) {
                course.diff2 = 0.5;
            } else if (document.getElementById(course.id + 'Diff2').className.includes('effortless')) {
                course.diff2 = 0.25;
            } else {
                course.diff2 = 1;
            }

            course.diffFull = course.diff * course.diff2;

            if (course.sub == 'PE') {
                course.diffFull = course.diffFull * 0.01;
            }

            localStorage.setItem(course.id + 'Diff', course.diff);
            localStorage.setItem(course.id + 'Diff2', course.diff2);
            localStorage.setItem(course.id + 'DiffFull', course.diffFull);

            sum += +course.diffFull;
        }

        let glDiff = ((sum) + (1.175 ** currentItems.length)) / 6;
        localStorage.setItem('list' + i + 'Diff', (Math.round((glDiff) * 100)) / 100);

        // console.table({ list: i, sum: sum, numberItems: currentItems.length });

        if (currentItems.length < 1 || localStorage.getItem('list' + i + 'Diff') <= 0) {
            document.getElementById('diff' + i).innerText = '';
            document.getElementById('diff' + i).className = 'listAttr hidden';
        } else if (localStorage.getItem('list' + i + 'Diff') < 1) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' Easy Coursework';
            document.getElementById('diff' + i).className = 'listAttr lev1';
        } else if (localStorage.getItem('list' + i + 'Diff') < 2) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' Normal Coursework';
            document.getElementById('diff' + i).className = 'listAttr lev2';
        } else if (localStorage.getItem('list' + i + 'Diff') < 3) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' Hard Coursework';
            document.getElementById('diff' + i).className = 'listAttr lev3';
        } else if (localStorage.getItem('list' + i + 'Diff') < 4) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' Difficult Coursework';
            document.getElementById('diff' + i).className = 'listAttr lev4';
        } else if (localStorage.getItem('list' + i + 'Diff') < 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' Challenging Coursework';
            document.getElementById('diff' + i).className = 'listAttr lev5';
        } else if (localStorage.getItem('list' + i + 'Diff') >= 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' Extreme Coursework';
            document.getElementById('diff' + i).className = 'listAttr lev6';
        }
    }
}

function calcCumDiff() {
    let cumDiffSum = 0;
    let filledLists = 0;

    for (let i = 9; i <= 13; i++) {
        if (!document.getElementById('diff' + i).className.includes('hidden')) {
            cumDiffSum += +localStorage.getItem('list' + i + 'Diff');
            filledLists++;
        }
    }

    cumDiff = (cumDiffSum / filledLists).toFixed(2);

    if (filledLists < 1 || cumDiff <= 0) {
        document.getElementById('diffCum').innerText = '';
        document.getElementById('diffCum').className = 'cumAttr hidden';
    } else if (cumDiff < 1) {
        document.getElementById('diffCum').innerHTML = `<span class='cumAttrNum'>${cumDiff}</span> Easy Coursework`;
        document.getElementById('diffCum').className = 'cumAttr';
    } else if (cumDiff < 2) {
        document.getElementById('diffCum').innerHTML = `<span class='cumAttrNum'>${cumDiff}</span> Normal Coursework`;
        document.getElementById('diffCum').className = 'cumAttr';
    } else if (cumDiff < 3) {
        document.getElementById('diffCum').innerHTML = `<span class='cumAttrNum'>${cumDiff}</span> Hard Coursework`;
        document.getElementById('diffCum').className = 'cumAttr';
    } else if (cumDiff < 4) {
        document.getElementById('diffCum').innerHTML = `<span class='cumAttrNum'>${cumDiff}</span> Difficult Coursework`;
        document.getElementById('diffCum').className = 'cumAttr';
    } else if (cumDiff < 5) {
        document.getElementById('diffCum').innerHTML = `<span class='cumAttrNum'>${cumDiff}</span> Challenging Coursework`;
        document.getElementById('diffCum').className = 'cumAttr';
    } else if (cumDiff >= 5) {
        document.getElementById('diffCum').innerHTML = `<span class='cumAttrNum'>${cumDiff}</span> Extreme Coursework`;
        document.getElementById('diffCum').className = 'cumAttr';
    }
}

function saveLists() {
    localStorage.setItem('list9', document.getElementById('list9').innerHTML);
    localStorage.setItem('list10', document.getElementById('list10').innerHTML);
    localStorage.setItem('list11', document.getElementById('list11').innerHTML);
    localStorage.setItem('list12', document.getElementById('list12').innerHTML);
    localStorage.setItem('list13', document.getElementById('list13').innerHTML);
    localStorage.setItem('listActs', document.getElementById('listActs').innerHTML);
    localStorage.setItem('listActs2', document.getElementById('listActs2').innerHTML);
    localStorage.setItem('listActs3', document.getElementById('listActs3').innerHTML);
    localStorage.setItem('listTests', document.getElementById('listTests').innerHTML);
    localStorage.setItem('listEssays', document.getElementById('listEssays').innerHTML);
    localStorage.setItem('listConnections', document.getElementById('listConnections').innerHTML);
}

function getLists() {
    document.getElementById('list9').innerHTML = localStorage.getItem('list9');
    document.getElementById('list10').innerHTML = localStorage.getItem('list10');
    document.getElementById('list11').innerHTML = localStorage.getItem('list11');
    document.getElementById('list12').innerHTML = localStorage.getItem('list12');
    document.getElementById('list13').innerHTML = localStorage.getItem('list13');
    document.getElementById('listActs').innerHTML = localStorage.getItem('listActs');
    document.getElementById('listActs2').innerHTML = localStorage.getItem('listActs2');
    document.getElementById('listActs3').innerHTML = localStorage.getItem('listActs3');
    document.getElementById('listTests').innerHTML = localStorage.getItem('listTests');
    document.getElementById('listEssays').innerHTML = localStorage.getItem('listEssays');
    document.getElementById('listConnections').innerHTML = localStorage.getItem('listConnections');
}

function getSubjectIcon(sub) {
    if (sub == 'English') {
        return 'sbjI fa-solid fa-pencil';
    } else if (sub == 'History') {
        return 'sbjI fa-solid fa-landmark';
    } else if (sub == 'Math') {
        return 'sbjI fa-solid fa-plus-minus';
    } else if (sub == 'Science') {
        return 'sbjI fa-solid fa-atom';
    } else if (sub == 'Foreign Language') {
        return 'sbjI fa-solid fa-globe';
    } else if (sub == 'Technology') {
        return 'sbjI fa-solid fa-compass-drafting';
    } else if (sub == 'Visual Arts') {
        return 'sbjI fa-solid fa-palette';
    } else if (sub == 'Performing Arts') {
        return 'sbjI fa-solid fa-masks-theater';
    } else if (sub == 'PE') {
        return 'sbjI fa-solid fa-dumbbell';
    } else if (sub == 'Other') {
        return 'sbjI fa-solid fa-graduation-cap';
    }
}

function getActIcon(act) {
    if (act == 'Athletics') {
        return 'actI fa-solid fa-dumbbell';
    } else if (act == 'Award') {
        return 'actI fa-solid fa-award';
    } else if (act == 'Club') {
        return 'actI fa-solid fa-puzzle-piece';
    } else if (act == 'Competition') {
        return 'actI fa-solid fa-ranking-star';
    } else if (act == 'Employment') {
        return 'actI fa-solid fa-briefcase';
    } else if (act == 'Event') {
        return 'actI fa-solid fa-calendar-day';
    } else if (act == 'Writing') {
        return 'actI fa-solid fa-pencil';
    } else if (act == 'Math') {
        return 'actI fa-solid fa-plus-minus';
    } else if (act == 'Music') {
        return 'actI fa-solid fa-music';
    } else if (act == 'Science') {
        return 'actI fa-solid fa-atom';
    } else if (act == 'Summer Class') {
        return 'actI fa-solid fa-umbrella-beach';
    } else if (act == 'Technology') {
        return 'actI fa-solid fa-compass-drafting';
    } else if (act == 'Visual Arts') {
        return 'actI fa-solid fa-palette';
    } else if (act == 'Performing Arts') {
        return 'actI fa-solid fa-masks-theater';
    } else if (act == 'Volunteering') {
        return 'actI fa-solid fa-hand-holding-hand';
    } else if (act == 'Other') {
        return 'actI fa-solid fa-graduation-cap';
    }
}

function getDiff(diff) {
    if (diff == '5') {
        return ['IB', 'attr ib'];
    } else if (diff == '4') {
        return ['AP', 'attr ap'];
    } else if (diff == '3') {
        return ['Honors', 'attr hon'];
    } else if (diff == '3.5') {
        return ['College', 'attr col'];
    } else if (diff == '2') {
        return ['Advanced', 'attr adv'];
    } else {
        return ['', 'attr none'];
    }
}

function getDiff2(diff2) {
    if (diff2 == '1.75') {
        return 'attr challenging hidden';
    } else if (diff2 == '1.5') {
        return 'attr difficult hidden';
    } else if (diff2 == '0.5') {
        return 'attr easy hidden';
    } else if (diff2 == '0.25') {
        return 'attr effortless hidden';
    } else {
        return 'attr regular hidden';
    }
}

function getLetter(pc) {
    if (pc >= 93) {
        return 'A';
    } else if (pc >= 90) {
        return 'A-';
    } else if (pc >= 87) {
        return 'B+';
    } else if (pc >= 83) {
        return 'B';
    } else if (pc >= 80) {
        return 'B-';
    } else if (pc >= 77) {
        return 'C+';
    } else if (pc >= 73) {
        return 'C';
    } else if (pc >= 70) {
        return 'C-';
    } else if (pc >= 67) {
        return 'D+';
    } else if (pc >= 63) {
        return 'D';
    } else if (pc >= 60) {
        return 'D-';
    } else {
        return 'F';
    }
}

function calcGPA() {
    if (localStorage.getItem('advWeight') != null) {
        advWeight = localStorage.getItem('advWeight');
    }
    if (localStorage.getItem('colWeight') != null) {
        colWeight = localStorage.getItem('colWeight');
    }
    if (localStorage.getItem('honWeight') != null) {
        honWeight = localStorage.getItem('honWeight');
    }
    if (localStorage.getItem('apWeight') != null) {
        apWeight = localStorage.getItem('apWeight');
    }
    if (localStorage.getItem('ibWeight') != null) {
        ibWeight = localStorage.getItem('ibWeight');
    }

    getCourses();

    for (let i = 9; i <= 13; i++) {
        let sum = 0;
        let wSum = 0;
        let ungradedSems = 0;
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];

            if (!plusMinus) {

                if (course.grade.includes('A')) {
                    course.indGPAGrade = 4;
                } else if (course.grade.includes('B')) {
                    course.indGPAGrade = 3;
                } else if (course.grade.includes('C')) {
                    course.indGPAGrade = 2;
                } else if (course.grade.includes('D')) {
                    course.indGPAGrade = 1;
                } else if (course.grade.includes('F')) {
                    course.indGPAGrade = 0;
                } else {
                    course.indGPAGrade = 0;
                    ungradedSems++;
                }

                if (course.grade2.includes('A')) {
                    course.indGPAGrade2 = 4;
                } else if (course.grade2.includes('B')) {
                    course.indGPAGrade2 = 3;
                } else if (course.grade2.includes('C')) {
                    course.indGPAGrade2 = 2;
                } else if (course.grade2.includes('D')) {
                    course.indGPAGrade2 = 1;
                } else if (course.grade2.includes('F')) {
                    course.indGPAGrade2 = 0;
                } else {
                    course.indGPAGrade2 = 0;
                    ungradedSems++;
                }

            } else {

                if (course.grade.includes('A+')) {
                    course.indGPAGrade = 4;
                } else if (course.grade.includes('A-')) {
                    course.indGPAGrade = 3.7;
                } else if (course.grade.includes('A')) {
                    course.indGPAGrade = 4;
                } else if (course.grade.includes('B+')) {
                    course.indGPAGrade = 3.3;
                } else if (course.grade.includes('B-')) {
                    course.indGPAGrade = 2.7;
                } else if (course.grade.includes('B')) {
                    course.indGPAGrade = 3;
                } else if (course.grade.includes('C+')) {
                    course.indGPAGrade = 2.3;
                } else if (course.grade.includes('C-')) {
                    course.indGPAGrade = 1.7;
                } else if (course.grade.includes('C')) {
                    course.indGPAGrade = 2;
                } else if (course.grade.includes('D+')) {
                    course.indGPAGrade = 1.3;
                } else if (course.grade.includes('D-')) {
                    course.indGPAGrade = 0;
                } else if (course.grade.includes('D')) {
                    course.indGPAGrade = 1;
                } else if (course.grade.includes('F')) {
                    course.indGPAGrade = 0;
                } else {
                    course.indGPAGrade = 0;
                    ungradedSems++;
                }

                if (course.grade2.includes('A+')) {
                    course.indGPAGrade2 = 4;
                } else if (course.grade2.includes('A-')) {
                    course.indGPAGrade2 = 3.7;
                } else if (course.grade2.includes('A')) {
                    course.indGPAGrade2 = 4;
                } else if (course.grade2.includes('B+')) {
                    course.indGPAGrade2 = 3.3;
                } else if (course.grade2.includes('B-')) {
                    course.indGPAGrade2 = 2.7;
                } else if (course.grade2.includes('B')) {
                    course.indGPAGrade2 = 3;
                } else if (course.grade2.includes('C+')) {
                    course.indGPAGrade2 = 2.3;
                } else if (course.grade2.includes('C-')) {
                    course.indGPAGrade2 = 1.7;
                } else if (course.grade2.includes('C')) {
                    course.indGPAGrade2 = 2;
                } else if (course.grade2.includes('D+')) {
                    course.indGPAGrade2 = 1.3;
                } else if (course.grade2.includes('D-')) {
                    course.indGPAGrade2 = 0;
                } else if (course.grade2.includes('D')) {
                    course.indGPAGrade2 = 1;
                } else if (course.grade2.includes('F')) {
                    course.indGPAGrade2 = 0;
                } else {
                    course.indGPAGrade2 = 0;
                    ungradedSems++;
                }

            }

            sum = sum + course.indGPAGrade + course.indGPAGrade2;

            if (course.grade.includes('A') || course.grade.includes('B') || course.grade.includes('C') || course.grade.includes('D') || course.grade.includes('F')) {
                if (document.getElementById(course.id + 'Diff').innerText == 'IB') {
                    course.wIndGPAGrade = +course.indGPAGrade + +ibWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'AP') {
                    course.wIndGPAGrade = +course.indGPAGrade + +apWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Honors') {
                    course.wIndGPAGrade = +course.indGPAGrade + +honWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'College') {
                    course.wIndGPAGrade = +course.indGPAGrade + +colWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Advanced') {
                    course.wIndGPAGrade = +course.indGPAGrade + +advWeight;
                } else {
                    course.wIndGPAGrade = course.indGPAGrade;
                }
            } else {
                course.wIndGPAGrade = 0;
            }

            if (course.grade2.includes('A') || course.grade2.includes('B') || course.grade2.includes('C') || course.grade2.includes('D') || course.grade2.includes('F')) {
                if (document.getElementById(course.id + 'Diff').innerText == 'IB') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +ibWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'AP') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +apWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Honors') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +honWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'College') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +colWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Advanced') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +advWeight;
                } else {
                    course.wIndGPAGrade2 = course.indGPAGrade2;
                }
            } else {
                course.wIndGPAGrade2 = 0;
            }

            wSum = wSum + course.wIndGPAGrade + course.wIndGPAGrade2;
        }

        gradedSems = (currentItems.length * 2) - ungradedSems;
        gpa = (sum / gradedSems).toFixed(2);
        wGpa = (wSum / gradedSems).toFixed(2);

        if (gradedSems < 1) {
            document.getElementById('gpa' + i).innerText = '';
            document.getElementById('wGpa' + i).innerText = '';
            document.getElementById('gpa' + i).className = 'listAttr hidden';
            document.getElementById('wGpa' + i).className = 'listAttr hidden';
            document.getElementById('diff' + i).classList.add('ml-0');
        } else {
            document.getElementById('gpa' + i).innerText = gpa + ' GPA';
            document.getElementById('wGpa' + i).innerText = wGpa + ' Weighted GPA';
            document.getElementById('gpa' + i).className = 'listAttr';
            document.getElementById('wGpa' + i).className = 'listAttr';
            document.getElementById('diff' + i).classList.remove('ml-0');
        }

    }
}

function calcCumGPA() {
    if (localStorage.getItem('advWeight') != null) {
        advWeight = localStorage.getItem('advWeight');
    }
    if (localStorage.getItem('colWeight') != null) {
        colWeight = localStorage.getItem('colWeight');
    }
    if (localStorage.getItem('honWeight') != null) {
        honWeight = localStorage.getItem('honWeight');
    }
    if (localStorage.getItem('apWeight') != null) {
        apWeight = localStorage.getItem('apWeight');
    }
    if (localStorage.getItem('ibWeight') != null) {
        ibWeight = localStorage.getItem('ibWeight');
    }

    let cumSum = 0;
    let cumWSum = 0;
    let cumUngradedSems = 0;
    let cumAllItems = 0;

    for (let i = 9; i <= 13; i++) {
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');
        cumAllItems = cumAllItems + (currentItems.length * 2);

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];

            if (!plusMinus) {

                if (course.grade.includes('A')) {
                    course.indGPAGrade = 4;
                } else if (course.grade.includes('B')) {
                    course.indGPAGrade = 3;
                } else if (course.grade.includes('C')) {
                    course.indGPAGrade = 2;
                } else if (course.grade.includes('D')) {
                    course.indGPAGrade = 1;
                } else if (course.grade.includes('F')) {
                    course.indGPAGrade = 0;
                } else {
                    course.indGPAGrade = 0;
                    cumUngradedSems++;
                }

                if (course.grade2.includes('A')) {
                    course.indGPAGrade2 = 4;
                } else if (course.grade2.includes('B')) {
                    course.indGPAGrade2 = 3;
                } else if (course.grade2.includes('C')) {
                    course.indGPAGrade2 = 2;
                } else if (course.grade2.includes('D')) {
                    course.indGPAGrade2 = 1;
                } else if (course.grade2.includes('F')) {
                    course.indGPAGrade2 = 0;
                } else {
                    course.indGPAGrade2 = 0;
                    cumUngradedSems++;
                }

            } else {

                if (course.grade.includes('A+')) {
                    course.indGPAGrade = 4;
                } else if (course.grade.includes('A-')) {
                    course.indGPAGrade = 3.7;
                } else if (course.grade.includes('A')) {
                    course.indGPAGrade = 4;
                } else if (course.grade.includes('B+')) {
                    course.indGPAGrade = 3.3;
                } else if (course.grade.includes('B-')) {
                    course.indGPAGrade = 2.7;
                } else if (course.grade.includes('B')) {
                    course.indGPAGrade = 3;
                } else if (course.grade.includes('C+')) {
                    course.indGPAGrade = 2.3;
                } else if (course.grade.includes('C-')) {
                    course.indGPAGrade = 1.7;
                } else if (course.grade.includes('C')) {
                    course.indGPAGrade = 2;
                } else if (course.grade.includes('D+')) {
                    course.indGPAGrade = 1.3;
                } else if (course.grade.includes('D-')) {
                    course.indGPAGrade = 0;
                } else if (course.grade.includes('D')) {
                    course.indGPAGrade = 1;
                } else if (course.grade.includes('F')) {
                    course.indGPAGrade = 0;
                } else {
                    course.indGPAGrade = 0;
                    cumUngradedSems++;
                }

                if (course.grade2.includes('A+')) {
                    course.indGPAGrade2 = 4;
                } else if (course.grade2.includes('A-')) {
                    course.indGPAGrade2 = 3.7;
                } else if (course.grade2.includes('A')) {
                    course.indGPAGrade2 = 4;
                } else if (course.grade2.includes('B+')) {
                    course.indGPAGrade2 = 3.3;
                } else if (course.grade2.includes('B-')) {
                    course.indGPAGrade2 = 2.7;
                } else if (course.grade2.includes('B')) {
                    course.indGPAGrade2 = 3;
                } else if (course.grade2.includes('C+')) {
                    course.indGPAGrade2 = 2.3;
                } else if (course.grade2.includes('C-')) {
                    course.indGPAGrade2 = 1.7;
                } else if (course.grade2.includes('C')) {
                    course.indGPAGrade2 = 2;
                } else if (course.grade2.includes('D+')) {
                    course.indGPAGrade2 = 1.3;
                } else if (course.grade2.includes('D-')) {
                    course.indGPAGrade2 = 0;
                } else if (course.grade2.includes('D')) {
                    course.indGPAGrade2 = 1;
                } else if (course.grade2.includes('F')) {
                    course.indGPAGrade2 = 0;
                } else {
                    course.indGPAGrade2 = 0;
                    cumUngradedSems++;
                }

            }

            cumSum = cumSum + course.indGPAGrade + course.indGPAGrade2;

            if (course.grade.includes('A') || course.grade.includes('B') || course.grade.includes('C') || course.grade.includes('D') || course.grade.includes('F')) {
                if (document.getElementById(course.id + 'Diff').innerText == 'IB') {
                    course.wIndGPAGrade = +course.indGPAGrade + +ibWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'AP') {
                    course.wIndGPAGrade = +course.indGPAGrade + +apWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Honors') {
                    course.wIndGPAGrade = +course.indGPAGrade + +honWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'College') {
                    course.wIndGPAGrade = +course.indGPAGrade + +colWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Advanced') {
                    course.wIndGPAGrade = +course.indGPAGrade + +advWeight;
                } else {
                    course.wIndGPAGrade = course.indGPAGrade;
                }
            } else {
                course.wIndGPAGrade = 0;
            }

            if (course.grade2.includes('A') || course.grade2.includes('B') || course.grade2.includes('C') || course.grade2.includes('D') || course.grade2.includes('F')) {
                if (document.getElementById(course.id + 'Diff').innerText == 'IB') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +ibWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'AP') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +apWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Honors') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +honWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'College') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +colWeight;
                } else if (document.getElementById(course.id + 'Diff').innerText == 'Advanced') {
                    course.wIndGPAGrade2 = +course.indGPAGrade2 + +advWeight;
                } else {
                    course.wIndGPAGrade2 = course.indGPAGrade2;
                }
            } else {
                course.wIndGPAGrade2 = 0;
            }

            cumWSum = cumWSum + course.wIndGPAGrade + course.wIndGPAGrade2;
        }
    }

    cumGradedSems = cumAllItems - cumUngradedSems;
    cumGpa = (cumSum / cumGradedSems).toFixed(2);
    cumWGpa = (cumWSum / cumGradedSems).toFixed(2);

    if (cumGradedSems < 1) {
        document.getElementById('gpaCum').innerHTML = '';
        document.getElementById('wGpaCum').innerHTML = '';
        document.getElementById('gpaCum').className = 'cumAttr hidden';
        document.getElementById('wGpaCum').className = 'cumAttr hidden';
    } else {
        document.getElementById('gpaCum').innerHTML = `<span class='cumAttrNum'>${cumGpa}</span> GPA (Cumulative)`;
        document.getElementById('wGpaCum').innerHTML = `<span class='cumAttrNum'>${cumWGpa}</span> Weighted GPA (Cumulative)`;
        document.getElementById('gpaCum').className = 'cumAttr';
        document.getElementById('wGpaCum').className = 'cumAttr';
    }

}

function calcECStrength() {
    let ecSum = 0;
    let allItems = 0;
    let maxValue = 5;

    for (let i = 1; i <= 3; i++) {
        let currentItems;
        if (i == 1) {
            currentItems = document.getElementById('listActs').getElementsByTagName('li');
        } else {
            currentItems = document.getElementById('listActs' + i).getElementsByTagName('li');
        }
        allItems += currentItems.length;

        for (let j = 0; j < currentItems.length; j++) {
            activity = currentItems[j];

            if (activity.strength == 1) {
                revStrength = 5;
            } else if (activity.strength == 2) {
                revStrength = 2.5;
            } else if (activity.strength == 3) {
                revStrength = 1;
            }

            ecSum += revStrength;
        }
    }

    ecStrength = (((ecSum / allItems) / maxValue) * allItems).toFixed(1);

    if (allItems < 1) {
        document.getElementById('ecStrength').innerText = '';
        document.getElementById('ecStrength').className = 'cumAttr hidden';
    } else if (ecStrength < 1.5) {
        document.getElementById('ecStrength').innerHTML = `<span class='cumAttrNum'>${ecStrength}</span> Very Weak Extracurriculars`;
        document.getElementById('ecStrength').className = 'cumAttr';
    } else if (ecStrength < 3) {
        document.getElementById('ecStrength').innerHTML = `<span class='cumAttrNum'>${ecStrength}</span> Weak Extracurriculars`;
        document.getElementById('ecStrength').className = 'cumAttr';
    } else if (ecStrength < 4.5) {
        document.getElementById('ecStrength').innerHTML = `<span class='cumAttrNum'>${ecStrength}</span> Moderate Extracurriculars`;
        document.getElementById('ecStrength').className = 'cumAttr';
    } else if (ecStrength < 6) {
        document.getElementById('ecStrength').innerHTML = `<span class='cumAttrNum'>${ecStrength}</span> Strong Extracurriculars`;
        document.getElementById('ecStrength').className = 'cumAttr';
    } else if (ecStrength < 7.5) {
        document.getElementById('ecStrength').innerHTML = `<span class='cumAttrNum'>${ecStrength}</span> Very Strong Extracurriculars`;
        document.getElementById('ecStrength').className = 'cumAttr';
    } else if (ecStrength >= 7.5) {
        document.getElementById('ecStrength').innerHTML = `<span class='cumAttrNum'>${ecStrength}</span> Exceptional Extracurriculars`;
        document.getElementById('ecStrength').className = 'cumAttr';
    }
}

function countWords(string) {
    // https://www.mediacollege.com/internet/javascript/text/count-words.html
    string = string.replace(/(^\s*)|(\s*$)/gi, '').replace(/[ ]{2,}/gi, ' ').replace(/\n /, '\n');
    return string.split(' ').length;
}

function toggleEssay(id) {
    if (document.getElementById(id + 'EssayText').className.includes('hidden')) {
        document.getElementById(id + 'EssayText').classList.remove('hidden');
        document.getElementById(id + 'EssayTeaser').classList.add('hidden');

        document.getElementById(id + 'ExpandEBtnText').innerText = 'Close essay';
        document.getElementById(id + 'ExpandEI').classList.remove('fa-chevron-down');
        document.getElementById(id + 'ExpandEI').classList.add('fa-chevron-up');
    } else {
        document.getElementById(id + 'EssayText').classList.add('hidden');
        document.getElementById(id + 'EssayTeaser').classList.remove('hidden');

        document.getElementById(id + 'ExpandEBtnText').innerText = 'Expand essay';
        document.getElementById(id + 'ExpandEI').classList.add('fa-chevron-down');
        document.getElementById(id + 'ExpandEI').classList.remove('fa-chevron-up');
    }

    saveLists();
}

document.getElementById('advOptAddC').addEventListener('click', function (event) {
    event.preventDefault();

    document.getElementById('advOptionsAddC').classList.toggle('hidden');
    document.getElementById('advOptAddCI').classList.toggle('rotate-90');
});

document.getElementById('advOptEditC').addEventListener('click', function (event) {
    event.preventDefault();

    document.getElementById('advOptionsEditC').classList.toggle('hidden');
    document.getElementById('advOptEditCI').classList.toggle('rotate-90');
});

function addContactMethod() {
    event.preventDefault();

    let contact = document.createElement('li');
    contact.className = 'connectionContact';

    t = document.createTextNode(document.getElementById('connectionContactInput').value);
    let span = document.createElement('span');
    span.className = 'connectionContactText';
    span.appendChild(t);
    contact.appendChild(span);

    t = document.createTextNode(document.getElementById('connectionContactType').value);
    span = document.createElement('span');
    span.className = 'connectionContactSubtext';
    span.appendChild(t);
    contact.appendChild(span);

    document.getElementById('connectionContactMethodsList').appendChild(contact);

    document.getElementById('connectionContactInput').value = '';

    contact.addEventListener('click', deleteContactMethod, false);
}

// this doesnt work...it removes only part of the text if specifically click that part of the text...idk why.
function deleteContactMethod(e) {
    console.log(e.target);
    if (e.target.className = 'connectionContact') {
        e.target.remove();
    } else if (e.target.className = 'connectionContactSubtext') {
        e.target.parentElement.remove();
    } else if (e.target.className = 'connectionContactText') {
        e.target.parentElement.remove();
    }
};

for (let i = 0; i < document.getElementsByClassName('connectionContact').length; i++) {
    document.getElementsByClassName('connectionContact')[i].addEventListener('click', deleteContactMethod, false);
}

// move elements within and between lists
/* document.addEventListener('DOMContentLoaded', (event) => {
    var dragSrcEl = null;
 
    function handleDragStart(e) {
        this.style.opacity = '0.5';
 
        dragSrcEl = this;
 
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
 
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
 
        e.dataTransfer.dropEffect = 'move';
 
        return false;
    }
 
    function handleDragEnter(e) {
        this.classList.add('over');
    }
 
    function handleDragLeave(e) {
        this.classList.remove('over');
    }
 
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
 
        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
 
            console.log(dragSrcEl);
            console.log(this);
 
            let pen = document.getElementsByClassName('pen');
            for (i = 0; i < pen.length; i++) {
                pen[i].onclick = function () {
                    if (this.parentElement.parentElement.id.startsWith('C')) {
                        clickPen(this.parentElement.parentElement);
                    } else if (this.parentElement.parentElement.id.startsWith('A')) {
                        clickPenAct(this.parentElement.parentElement);
                    } else if (this.parentElement.parentElement.id.startsWith('T')) {
                        clickPenTest(this.parentElement.parentElement);
                    } else if (this.parentElement.parentElement.id.startsWith('E')) {
                        clickPenEssay(this.parentElement.parentElement);
                    } else if (this.parentElement.parentElement.id.startsWith('O')) {
                        clickPenConnection(this.parentElement.parentElement);
                    }
                }
            }
 
            let trash = document.getElementsByClassName('trash');
            for (i = 0; i < trash.length; i++) {
                trash[i].onclick = function () {
                    clickTrash(this.parentElement.parentElement);
                }
            }
        }
 
        return false;
    }
 
    function handleDragEnd(e) {
        this.style.opacity = '1';
 
        items.forEach(function (item) {
            item.classList.remove('over');
        });
 
        saveLists();
        calcListDiff();
    }
 
    let items = document.querySelectorAll('.item');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}); */

/* window.onclick = function (event) {
    if (event.target == document.getElementById('courseModal')
        || event.target == document.getElementById('editCourseModal')
        || event.target == document.getElementById('actModal')
        || event.target == document.getElementById('editActModal')
        || event.target == document.getElementById('testModal')
        || event.target == document.getElementById('editTestModal')
        || event.target == document.getElementById('essayModal')
        || event.target == document.getElementById('editEssayModal')
        || event.target == document.getElementById('connectionModal')
        || event.target == document.getElementById('editConnectionModal')
        || event.target == document.getElementById('diffModal')
        || event.target == document.getElementById('gpaModal')
        || event.target == document.getElementById('changeGPAModal')
        || event.target == document.getElementById('ecStrengthModal')
        || event.target == document.getElementById('countdownModal')
        || event.target == document.getElementById('deleteModal')) {
        hide();
    }
} */

function hide() {
    event.preventDefault();

    document.getElementById('courseModal').classList.add('fadeIn');
    document.getElementById('courseModal').classList.remove('fadeOut');
    document.getElementById('courseTitle').value = '';
    document.getElementById('selSubject').value = 'History';
    document.getElementById('selDiff').value = '1';
    document.getElementById('selDiff2').value = '1';
    document.getElementById('diffTip').classList.add('hidden');
    document.getElementById('advOptAddCI').classList.remove('rotate-90');
    document.getElementById('advOptionsAddC').classList.add('hidden');
    document.getElementById('percentGrade').classList.add('hidden');
    document.getElementById('selLetterGrade').value = 'none';
    document.getElementById('percentGrade').value = '';
    document.getElementById('percentGrade2').classList.add('hidden');
    document.getElementById('selLetterGrade2').value = 'none';
    document.getElementById('percentGrade2').value = '';
    input.classList.add('mb-4');

    document.getElementById('editCourseModal').classList.add('fadeIn');
    document.getElementById('editCourseModal').classList.remove('fadeOut');
    document.getElementById('diffTipEdit').classList.add('hidden');
    document.getElementById('advOptEditCI').classList.remove('rotate-90');
    document.getElementById('advOptionsEditC').classList.add('hidden');
    document.getElementById('percentGradeEdit').classList.add('hidden');
    document.getElementById('percentGradeEdit').value = '';
    document.getElementById('percentGrade2Edit').classList.add('hidden');
    document.getElementById('percentGrade2Edit').value = '';
    inputE.classList.add('mb-4');

    document.getElementById('actModal').classList.add('fadeIn');
    document.getElementById('actModal').classList.remove('fadeOut');
    document.getElementById('actTitle').value = '';
    document.getElementById('actDesc').value = '';
    document.getElementById('selActCategory').value = 'Athletics';

    document.getElementById('editActModal').classList.add('fadeIn');
    document.getElementById('editActModal').classList.remove('fadeOut');

    document.getElementById('testModal').classList.add('fadeIn');
    document.getElementById('testModal').classList.remove('fadeOut');
    document.getElementById('selTestSpecies').value = 'ACT';
    document.getElementById('testSubSpecies').value = '';
    document.getElementById('testSpeciesOther').value = '';
    document.getElementById('testMonth').value = '';
    document.getElementById('testYear').value = '';
    document.getElementById('testScore').value = '';
    document.getElementById('readingTestScore').value = '';
    document.getElementById('mathTestScore').value = '';
    document.getElementById('testSubSpecies').classList.add('hidden');
    document.getElementById('testSpeciesOther').classList.add('hidden');
    document.getElementById('testSubScoreDiv').classList.add('hidden');
    document.getElementById('testSubScoreDiv').classList.remove('flex');

    document.getElementById('editTestModal').classList.add('fadeIn');
    document.getElementById('editTestModal').classList.remove('fadeOut');
    document.getElementById('testSubSpeciesEdit').value = '';
    document.getElementById('testSpeciesOtherEdit').value = '';
    document.getElementById('readingTestScoreEdit').value = '';
    document.getElementById('mathTestScoreEdit').value = '';
    document.getElementById('testSubSpeciesEdit').classList.add('hidden');
    document.getElementById('testSpeciesOtherEdit').classList.add('hidden');
    document.getElementById('testSubScoreDivEdit').classList.add('hidden');
    document.getElementById('testSubScoreDivEdit').classList.remove('flex');

    document.getElementById('essayModal').classList.add('fadeIn');
    document.getElementById('essayModal').classList.remove('fadeOut');
    document.getElementById('essayPrompt').value = '';
    document.getElementById('essayText').value = '';
    document.getElementById('essayWordCount').innerText = '0';

    document.getElementById('editEssayModal').classList.add('fadeIn');
    document.getElementById('editEssayModal').classList.remove('fadeOut');

    document.getElementById('connectionModal').classList.add('fadeIn');
    document.getElementById('connectionModal').classList.remove('fadeOut');

    document.getElementById('editConnectionModal').classList.add('fadeIn');
    document.getElementById('editConnectionModal').classList.remove('fadeOut');

    document.getElementById('diffModal').classList.add('fadeIn');
    document.getElementById('diffModal').classList.remove('fadeOut');

    document.getElementById('gpaModal').classList.add('fadeIn');
    document.getElementById('gpaModal').classList.remove('fadeOut');

    document.getElementById('changeGPAModal').classList.add('fadeIn');
    document.getElementById('changeGPAModal').classList.remove('fadeOut');

    document.getElementById('ecStrengthModal').classList.add('fadeIn');
    document.getElementById('ecStrengthModal').classList.remove('fadeOut');

    document.getElementById('countdownModal').classList.add('fadeIn');
    document.getElementById('countdownModal').classList.remove('fadeOut');

    document.getElementById('deleteModal').classList.add('fadeIn');
    document.getElementById('deleteModal').classList.remove('fadeOut');

    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
}