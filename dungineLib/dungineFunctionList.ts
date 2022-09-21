export class DungineFunctionList <functionType extends Function> {
    functionList: {name: string, func: functionType}[]

    constructor () {
        this.functionList = [];
    }

    add(newName: string, newFunc: functionType, before: string[] = []) {
        if (this.functionList.some((oldFunc) => {oldFunc.name == newName})) throw `The name ${newName} is already taken.`

        let maxI = Math.min(...before.map((beforeName) => {    // find the highest...
            let i = this.functionList.findIndex((oldFunc) => { // index of the functionList array where...
                return oldFunc.name == beforeName              // this new function needs to be after it.
            });
            return i == -1 ? Infinity : i; // if a name is not found, pretend it is before everything.
        }));

        this.functionList.splice(maxI, 0, {name: newName, func: newFunc}); // insert the function at the first possible place. (If maxI is infinity, it will insert at the end. Well done ECS devs!
    }
}

// example:
// let testFunctionList = new DungineFunctionList<()=>void>();
// 
// testFunctionList.add("4", ()=>{});
// testFunctionList.add("5", ()=>{});
// testFunctionList.add("2", ()=>{}, ["4"]);
// testFunctionList.add("3", ()=>{}, ["4"]);
// testFunctionList.add("1", ()=>{}, ["2"]);
// testFunctionList.add("6", ()=>{});
// 
// console.log(testFunctionList.functionList.map((a)=>{return a.name}));
//
// Technically speaking, specifying after is not needed