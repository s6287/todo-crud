import React from 'react'
import { useState } from 'react'
function Todo() {
    const [List, addList] = useState([]);
    const [inputvalue, readInputValue] = useState("");
    const [editIndex, seteditIndex] = useState(null);

    function catchinputfeild(e) {
        readInputValue(e.target.value)
    }

    function addtask() {
        if (inputvalue.trim() === "") return; // optional: prevent empty tasks
        addList([...List, inputvalue]);
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
        readInputValue(List[index])
    }

    function saveTask() {
        let copy = [...List];
        copy[editIndex] = inputvalue;
        addList(copy)
        readInputValue("");
        seteditIndex(null);
    }


    return (
        <>

            <div className="flex items-center gap-4 mb-4">
                <input
                    onChange={catchinputfeild}
                    type="text"
                    placeholder="What do you need to do?"
                    value={inputvalue}
                    className="flex-1 px-4 py-2 border-2 border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400"
                />
                <button onClick={editIndex !== null ? saveTask : addtask} className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors duration-200">
                    {editIndex != null ? "Save Task" : "Add Task"}
                </button>
            </div>
            {/* List showing  */}
            <div className="mt-4">
                <ul className="space-y-2">
                    {List.map((item, index) => (
                        <li key={index}>
                            <div className="flex justify-between items-center border border-amber-400 rounded-lg px-4 py-2 bg-white shadow-sm">
                                <span className="text-gray-800 font-medium">{item}</span>
                                <button onClick={function () { deleteTask(index) }} className="text-red-500 hover:text-red-700 font-medium">
                                    Delete Task
                                </button>

                                <button onClick={function () { editTask(index) }} className="text-red-500 hover:text-red-700 font-medium">
                                    Edit Task
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


        </>
    )
}

export default Todo;
