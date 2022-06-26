class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;        

        this.#addKeyBoardListeners(); 
    }

    // the # infront of function name indicates it is a private method
    #addKeyBoardListeners() {
        // on pressing
        document.onkeydown = (event) => {
            switch(event.key) {
                case "ArrowLeft": this.left = true; break;
                case "ArrowRight": this.right = true; break;
                case "ArrowUp": this.forward = true; break;
                case "ArrowDown": this.reverse = true; break;
            }

            // console.table(this); // showing this props in tabular format -- NICE!!!
        }

        // on releasing
        document.onkeyup = (event) => {
            switch(event.key) {
                case "ArrowLeft": this.left = false; break;
                case "ArrowRight": this.right = false; break;
                case "ArrowUp": this.forward = false; break;
                case "ArrowDown": this.reverse = false; break;
            }
            // console.table(this); // showing this props in tabular format -- NICE!!!
        }
    }
}