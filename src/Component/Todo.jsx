import React from 'react'
import { useState } from 'react'
function Todo() {
    const [List, addList] = useState([]);
    const [inputvalue, readInputValue] = useState("");
    const [editIndex, seteditIndex] = useState(null);
    const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"


    function catchinputfeild(e) {
        readInputValue(e.target.value)
    }

    function addtask() {
        if (inputvalue.trim() === "") return; // optional: prevent empty tasks
        addList([...List, { text: inputvalue, completed: false }]);
        readInputValue("")
    }

    function deleteTask(indexTodelete) {
        const newList = List.filter(function (currentelementshow, i) {
            return i != indexTodelete
        })
        addList(newList);
    }

    function editTask(index) {
        seteditIndex(index);
        // seteditValue(List[index])
        readInputValue(List[index].text)
    }

    function saveTask() {
        let copy = [...List];
        copy[editIndex].text = inputvalue;
        addList(copy)
        readInputValue("");
        seteditIndex(null);
    }

    function completemark(index) {
        const updatedlist = [...List];
        if (updatedlist[index].completed === true) {
            updatedlist[index].completed = false;
        } else {
            updatedlist[index].completed = true;
        }
        addList(updatedlist);
    }

    const filteredList = List.filter(item => {
        if (filter === "active") return item.completed === false;
        if (filter === "completed") return item.completed === true;
        return true; // for "all"
    });

    return (
        <>

            <div className="flex items-center gap-4 mb-4">

                <button onClick={() => setFilter("active")} className="px-3 py-1 bg-blue-200 rounded">Active Task</button>
                <button onClick={() => setFilter("completed")} className="px-3 py-1 bg-green-200 rounded">Completed Task</button>
                <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-200 rounded">All Tasks</button>

                <input
                    onChange={catchinputfeild}
                    type="text"
                    placeholder="What do you need to do?"
                    value={inputvalue}
                    className="flex-1 px-4 py-2 border-2 border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400"
                />
                <button onClick={editIndex !== null ? saveTask : addtask} className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors duration-200">
                    {editIndex != null ? "✔️" : "➕"}
                </button>
            </div >
            {/* List showing  */}
            < div className="mt-4" >
                <ul className="space-y-2">
                    {filteredList.map((item, index) => (
                        <li key={index}>
                            <div className="flex justify-between items-center border border-amber-400 rounded-lg px-4 py-2 bg-white shadow-sm">
                                <span
                                    className={`ml-6 text-gray-800 font-medium ${item.completed ? "line-through text-gray-400" : ""
                                        }`}
                                >
                                    {item.text}
                                </span>
                                <button onClick={function () { deleteTask(index) }} className=" ml-6 text-red-500 hover:text-red-700 font-medium">
                                    🗑️
                                </button>

                                <button onClick={function () { editTask(index) }} className=" ml-6 text-red-500 hover:text-red-700 font-medium">
                                    📝
                                </button>

                                <button onClick={function () { completemark(index) }} className=" ml-6 text-red-500 hover:text-red-700 font-medium">
                                    {item.completed ? "Mark Not completed" : "completed"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div >


        </>
    )
}

export default Todo;
