const keyboard = {
    elements: {
        main: null,
        textarea: null,
        keyboardbox: null,
        keys: [],
        firstRow: null,
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        ctrl: false,
        language: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng',
    },

    language: {
        eng: [
            ["!","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "←"],
            ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "DEL"],
            ["⇪", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
            ["Shift", "`", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "⇑", "shift"],
            ["Ctrl", "Alt", "⌘", "space", "⌘", "Alt", "⇐", "⇓", "⇒"],
        ],
        rus: [
            ["!", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "←"],
            ["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", "DEL"],
            ["⇪", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "ENTER"],
            ["Shift", "`", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё", "⇑", "shift"],
            ["Ctrl","Alt", "⌘", "space", "⌘", "Alt", "⇐", "⇓", "⇒"],
        ],
    },

    init() {
        // Create container 
        this.elements.main = document.createElement("main");
        this.elements.main.classList.add("container");

        // Create textarea
        this.elements.textarea = document.createElement("textarea");

        // Create keyboard
        this.elements.keyboardbox = document.createElement("div");
        this.elements.keyboardbox.classList.add("keyboard");
        
        
        this.elements.keyboardbox.appendChild(this.createKeys());

        this.elements.keys = this.elements.keyboardbox.querySelectorAll("button");

        // Add to DOM
        this.elements.main.appendChild(this.elements.textarea);
        this.elements.main.appendChild(this.elements.keyboardbox);

        document.body.appendChild(this.elements.main);

    },

    createKeys(source = this.language[this.properties.language]) {
        const fragment = document.createDocumentFragment();
        
        source.forEach(item => {
            const rowElement = document.createElement("div");
            item.forEach(key => {
                const keyElement = document.createElement("button");

                switch (key) {
                    case "←":
                        keyElement.classList.add("backspace");
                        keyElement.textContent = key;
            
                        keyElement.addEventListener("click", () => {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                            this._output();
                        });
            
                        break;
            
                    case "⇪":
                        keyElement.classList.add("caps");
                        keyElement.textContent = key;
            
                        keyElement.addEventListener("click", () => {
                            this._toggleCapsLock();
                            keyElement.classList.toggle("caps_active", this.properties.capsLock);
                        });
            
                        break;

                    case "Tab":
                        keyElement.classList.add("tab");
                        keyElement.textContent = key;
                        keyElement.addEventListener("click", () => {
                            this.properties.value = this.properties.value + "\t";
                            this._output();
                        });
                            
                        break; 
            
                    case "ENTER":
                        keyElement.classList.add("enter");
                        keyElement.textContent = key.toUpperCase();
            
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this._output();
                        });
            
                        break;
            
                    case "space":
                        keyElement.classList.add("space");
                        keyElement.textContent = this.properties.language;
            
                        keyElement.addEventListener("click", () => {
                            if (this.properties.ctrl) {
                                this._changeLangusge();
                                this._toggleCtrl();

                                this.elements.main.removeChild(this.elements.keyboardbox);

                                this.elements.keyboardbox = document.createElement("div");
                                this.elements.keyboardbox.classList.add("keyboard");
                                this.elements.keyboardbox.appendChild(this.createKeys());
                                this.elements.keys = this.elements.keyboardbox.querySelectorAll("button");

                                this.elements.main.appendChild(this.elements.keyboardbox);
                            } else {
                                this.properties.value += " ";
                                this._output();
                            }
                        });
            
                        break;

                    case "Shift":
                        keyElement.classList.add("leftshift");
                        keyElement.textContent = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this._toggleShift();
                            this._changeRegister();
                            this.properties.shift ? this._showSpecChars() : this._returnFirstRow();
                        })

                        break;
                    
                    case "shift":
                        keyElement.textContent = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this._toggleShift();
                            this._changeRegister();
                            this.properties.shift ? this._showSpecChars() : this._returnFirstRow();
                        })

                        break;

                    case "Ctrl":
                        keyElement.classList.add("leftctrl");
                        keyElement.textContent = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this._toggleCtrl();
                            keyElement.classList.toggle("active", this.properties.ctrl);
                        })

                        break;


                    case "Alt":
                        keyElement.textContent = key;

                        break;

                    case "DEL":
                        keyElement.textContent = key;
    
                        break;

                    case "⌘":
                        keyElement.textContent = key;
        
                        break;

                    case "⇑":
                        keyElement.textContent = key;
            
                        break;

                    case "⇐":
                        keyElement.textContent = key;
                
                        break;
                    
                    case "⇓":
                        keyElement.textContent = key;
                    
                        break;    
                       
                    case "⇒":
                        keyElement.textContent = key;
                        
                        break;

                    default:
                        keyElement.textContent = key.toLowerCase();
            
                        keyElement.addEventListener("click", () => {
                            this.properties.value += this._isCapital() ? key.toUpperCase() : key.toLowerCase();
                            this._output();

                            if (this.properties.shift) {
                                this._toggleShift();
                                this._changeRegister();
                                this._returnFirstRow();
                            }
                        });
            
                        break;
                }

                rowElement.appendChild(keyElement);
            })
            fragment.appendChild(rowElement);
        })

        return fragment;
    },
    
    _output() {
        this.elements.textarea.value = this.properties.value;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this._changeRegister();
    },

    _changeRegister() {
        const exclusions = ["tab", "shift", "ctrl", "Alt", "ENTER", "shift", "DEL", "space"];

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && exclusions.indexOf(key.textContent) === -1) {
                key.textContent = this._isCapital() ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
    },

    _toggleCtrl() {
        this.properties.ctrl = !this.properties.ctrl;
    },

    _isCapital() {
        return this.properties.capsLock || this.properties.shift
    },

    _changeLangusge() {
        this.properties.language = this.properties.language === "eng" ? "rus" : "eng";
        localStorage.setItem('lang', this.properties.language);
    },

    _showSpecChars() {
        const chars = [["!", "@", "#", "$", "%", ":", "&", "*", "(", ")", "_", "+", "|", "←"]];
        const specialChars = this.createKeys(chars);

        const firstRow = this.elements.keyboardbox.childNodes[0];

        this.elements.keyboardbox.replaceChild(specialChars, firstRow);
        this.elements.keys = this.elements.keyboardbox.querySelectorAll("button");
    },

    _returnFirstRow() {
        const firstRow = this.createKeys([this.language[this.properties.language][0]]);

        this.elements.keyboardbox.replaceChild(firstRow, this.elements.keyboardbox.childNodes[0]);
        this.elements.keys = this.elements.keyboardbox.querySelectorAll("button");
    }
 
}

keyboard.init();