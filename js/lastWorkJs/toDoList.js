const toDoWrapper = document.querySelector(".todo__wrapper"),
    toDoForm = toDoWrapper.querySelector("form"),
    toDoList = toDoWrapper.querySelector(".toDoList"),
    toDoListWeek = toDoWrapper.querySelector(".toDoList__week");

const toDoId = document.getElementById("toDoId");

let toDo_ary = [],
    week_ary= [];

const TODO_LS = "currentToDo",
    WEEK_LS = "weekToDo";

    function saveToDo(){
        localStorage.setItem(TODO_LS, JSON.stringify(toDo_ary));
    }

    function saveToWeek(){
        localStorage.setItem(WEEK_LS, JSON.stringify(week_ary));
    }

    function deleteHandle(e){
        e.preventDefault();
        const btnTarget = e.target;
        const parentLi = btnTarget.parentNode;
        const offSetLi = parentLi.parentNode;
        
        
        if(offSetLi.id === toDoList.id){
            offSetLi.removeChild(parentLi);
            const toDoDelete = toDo_ary.filter(toDo => {
                if(parentLi.id != JSON.stringify(toDo.id)){
                    return toDo;
                }
            })
            toDo_ary = toDoDelete;
            saveToDo();
        } else {
            offSetLi.removeChild(parentLi);
            const toDoDelete = week_ary.filter(toDo => {
                if(parentLi.id != JSON.stringify(toDo.id)){
                    return toDo;
                }
            })
            week_ary = toDoDelete;
            saveToWeek();
        }
    }

    function sendHandle(e){
        e.preventDefault();

        const parentList = e.target.parentNode;
        const parentUl = parentList.parentNode;
        const btn = e.target;
        const text = parentList.firstChild.innerText;
        if(parentUl.id === toDoId.id){

            const idx = toDo_ary.findIndex(function(item){
                return parseInt(parentList.id) === item.id;
            })
            if (idx > -1){
                toDo_ary.splice(idx, parseInt(parentList.id))
            }

            const liId = week_ary.length + 1;
            parentList.id = liId;
            btn.innerText = "←";

            toDoListWeek.appendChild(parentList);

            const obj = {
                text,
                id: liId
            }

            week_ary.push(obj);

        } else {
            const idx = week_ary.findIndex(function(item){
                return parseInt(parentList.id) === item.id;
            })
            if (idx > -1){
                week_ary.splice(idx, parseInt(parentList.id))
            }

            const liId = toDo_ary.length + 1;
            parentList.id = liId;
            btn.innerText = "→";

            toDoList.appendChild(parentList);

            const obj = {
                text,
                id: liId
            }

            toDo_ary.push(obj);
            
        }

        saveToDo();
        saveToWeek();

    }

    function paintTodo(text){
        const li = document.createElement("li");
        const span = document.createElement("span");
        const btn = document.createElement("button");
        const btn2 = document.createElement("button");

        const listId = toDo_ary.length + 1;

        span.innerText = text;
        btn.innerText = "❌";
        btn2.innerText = "→";
        btn.addEventListener("click", deleteHandle);
        btn2.addEventListener("click", sendHandle);
        li.id = listId;
        li.appendChild(span);
        li.appendChild(btn);
        li.appendChild(btn2);
        toDoList.appendChild(li);

        const toDo_obj = {
            text,
            id: listId
        }
        toDo_ary.push(toDo_obj);
        
        saveToDo();

    }

    function paintToWeek(text){
        const li = document.createElement("li");
        const span = document.createElement("span");
        const btn = document.createElement("button");
        const btn2 = document.createElement("button");

        const listId = week_ary.length + 1;

        span.innerText = text;
        btn.innerText = "❌";
        btn2.innerText = "←";
        btn.addEventListener("click", deleteHandle);
        btn2.addEventListener("click", sendHandle);
        li.id = listId;
        li.appendChild(span);
        li.appendChild(btn);
        li.appendChild(btn2);
        toDoListWeek.appendChild(li);

        const week_obj = {
            text,
            id: listId
        }
        week_ary.push(week_obj);
        
        saveToWeek();

    }

    function loadToDos(){
        const toDoValue = localStorage.getItem(TODO_LS);
        let currentToDo = JSON.parse(toDoValue);

        if(toDoValue !== null){
            currentToDo.forEach(toDo => {
                console.log(currentToDo)
                const toDoText = toDo.text;
                paintTodo(toDoText);
            })
        }

        const toWeekValue = localStorage.getItem(WEEK_LS);
        const currentToWeek = JSON.parse(toWeekValue);

        if(toWeekValue !== null){
            currentToWeek.forEach(toDo => {
                const toDoText = toDo.text;
                paintToWeek(toDoText);
            })
        }
    }

    function toDoHandle(e){
        e.preventDefault();
        const toDoValue = e.target[0].value;

        paintTodo(toDoValue);
        
    }

    function toDoInit(){
        loadToDos();
        toDoForm.addEventListener("submit", toDoHandle);
    }

    
    if(toDoForm){
        toDoInit();
    }