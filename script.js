let data = `[{"word":"association","mean":"sự kết hợp"},{"word":"advertise ","mean":"Quảng cáo "},{"word":"staff","mean":"nhân viên"},{"word":"demonstrate ","mean":"chứng minh "},{"word":"supervisor","mean":"người giám sát"},{"word":"departure","mean":"sự khởi hành"},{"word":"schedule","mean":"lịch trình"},{"word":"safety","mean":"sự an toàn"},{"word":"coworker ","mean":"đồng nghiệp "},{"word":"attentive","mean":"chú ý"},{"word":"absolutely","mean":"tuyệt đối"},{"word":"wastage","mean":"lãng phí"},{"word":"redevelopment","mean":"tái phát triển"},{"word":"unavailable","mean":"không có sẵn"},{"word":"magazine","mean":"tạp chí"},{"word":"receiving","mean":"nhận được"},{"word":"shipment","mean":"lô hàng"},{"word":"advertising","mean":"quảng cáo"},{"word":"agency","mean":"hãng"},{"word":"distinct","mean":"riêng biệt"},{"word":"identification","mean":"nhận biết"},{"word":"immediately","mean":"ngay lập tức"},{"word":"estate","mean":"tài sản"},{"word":"comprehensive","mean":"toàn diện"},{"word":"avoid","mean":"tránh xa"},{"word":"disturbing","mean":"phiền"},{"word":"brief","mean":"ngắn gọn"},{"word":"survey","mean":"sự khảo sát"},{"word":"presenting","mean":"trình bày"},{"word":"permit","mean":"cho phép làm gì"},{"word":"inclement","mean":"sự khắc nghiệt"},{"word":"borrowed","mean":"mượn"},{"word":"suitable","mean":"thích hợp"},{"word":"criteria","mean":"tiêu chuẩn"},{"word":"committees","mean":"ủy ban"},{"word":"evaluate ","mean":"đánh giá "},{"word":"reserve","mean":"dự trữ"},{"word":"conference","mean":"hội nghị"},{"word":"terminates","mean":"chấm dứt"},{"word":"diversify","mean":"đa dạng hóa"},{"word":"Healthcare","mean":"Chăm sóc sức khỏe"},{"word":"construction","mean":"sự thi công"},{"word":"estimated","mean":"ước lượng"},{"word":"conference","mean":"hội nghị"},{"word":"distance","mean":"khoảng cách"},{"word":"reserve","mean":"dự trữ"},{"word":"candidate","mean":"ứng viên"}]`


let dataProcessed = JSON.parse(data);

let input = document.querySelector('#da');

let random = Math.floor(Math.random() * dataProcessed.length);
let percent = 0;
function init(number) {
    let target = dataProcessed[number]
    speakWord(target.word);
    console.log(target);
    document.getElementById('title').innerText = target.mean;
    document.getElementById('result').innerText = hideWordForPercent(percent,target.word);
}
init(random);

function hideWordForPercent(percent, word) {
    const length = word.length;
    const numberOfHiddenChar = Math.floor(length * percent / 100);
    const indices = Array.from(Array(length).keys());
    
    // Shuffle the indices array
    for (let i = length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Create a set of indices to be replaced
    const indicesToReplace = new Set(indices.slice(0, numberOfHiddenChar));

    // Replace characters at the selected indices with '*'
    return word.split('').map((char, index) => indicesToReplace.has(index) ? '*' : char).join('');
}


input.addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
        if(dataProcessed.length === 0) {
            alert('Bạn đã hoàn thành tất cả các từ');
        }
        if (input.value.trim().toLocaleLowerCase() == dataProcessed[random].word.trim().toLocaleLowerCase()) {
            speakWord(dataProcessed[random].word);
            dataProcessed.splice(random,1);
            random = Math.floor(Math.random() * dataProcessed.length);
            init(random);
            this.value = '';
        }
    }
});


document.getElementById('show').addEventListener('click', function() {
    document.getElementById('result').innerText = dataProcessed[random].word;
    speakWord(dataProcessed[random].word);
});

document.getElementById("level").addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
        percent = parseInt(this.value);
        dataProcessed = JSON.parse(data);
        random = Math.floor(Math.random() * dataProcessed.length);
        init(random);
    }
});



















function speakWord(word) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(word);
        let voices = window.speechSynthesis.getVoices();
        console.log(voices);
        let femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.gender === 'female');
        
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Trình duyệt của bạn không hỗ trợ Web Speech API');
    }
}