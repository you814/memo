function displayMemo(memo){
    const ul = document.querySelector('#memo-ul');
    const li = document.createElement('li');
    li.innerText = `[id:${memo.id}] ${memo.content}`;
    ul.appendChild(li);
}

async function readMemo(){
    const res = await fetch('/memos');
    const jsonRes = await res.json();

    jsonRes.forEach(displayMemo);
    
}


async function createMemo (value) {
    const res = await fetch('/memos', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            content: value,
        }),
    });
    readMemo()
};



function handleSunmit(event) {
    event.preventDefault();
    const input = document.querySelector("#memo-input");
    createMemo(input.value);
    input.value="";
};

const form = document.querySelector('#memo-form')
form.addEventListener("submit", handleSunmit);

readMemo();