export class FunctionList <functionType extends Function> {
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
            if (i == -1) throw `The function with name ${beforeName} could not be found.`;
            return i;
        }));

        this.functionList.splice(maxI, 0, {name: newName, func: newFunc}); // insert the function at the first possible place. (If maxI is infinity, it will insert at the end. Well done ECS devs!
    }

    remove(name: string) {
        let i = this.functionList.findIndex((func) => {return func.name == name});
        if (i == -1) throw `The function with name ${name} could not be found.`;
        this.functionList.splice(i, 1);
    }

    excecute(args: any[]) {
        for (const func of this.functionList) {
            func.func(...args);
        }
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