/* SOLID.js

Aquest arxiu conté una implementació dels principis SOLID en JavaScript amb explicacions pedagògiques.
Els exemples estan explicats per ajudar a entendre millor cada principi.
*/

// Single Responsibility Principle
// Principi de responsabilitat única

// Una classe o funció ha de tenir una sola raó per canviar, això significa que ha de tenir només una feina.

class Journal {
    constructor() {
        this.entries = [];
        this.count = 0;
    }

    addEntry(text) {
        // Afegir una nova entrada al diari
        this.count++;
        this.entries.push(`${this.count}: ${text}`);
    }

    removeEntry(index) {
        // Eliminar una entrada per la seva posició
        this.entries.splice(index, 1);
    }

    toString() {
        // Convertir totes les entrades a un sol text.
        // Això és acceptable dins de Journal perquè només manipula les dades internes del diari.
        return this.entries.join('\n');
    }
}

// Aquesta funcionalitat NO hauria d'estar dins de la classe Journal perquè viola el principi de responsabilitat única (SRP).
// Guardar i carregar dades són responsabilitats diferents de gestionar el contingut del diari.
class JournalPersistence {
    static saveToFile(journal, filename) {
        /*
        Explicació:
        - Aquest mètode estàtic simula la persistència del diari en un fitxer.
        - No depèn de cap atribut de cap objecte de JournalPersistence, per això és estàtic.
        - Això vol dir que pots cridar-lo sense haver de crear una instància de JournalPersistence.
        Exemple: JournalPersistence.saveToFile(journal, "diari.txt");
        */
        console.log(`Saving to file: ${filename}`);
        console.log(journal.toString());
    }

    static loadFromFile(filename) {
        /*
        Simula la càrrega des d'un fitxer.
        Aquest mètode només està definit com a estructura per il·lustrar el disseny.
        Encara no implementa cap funcionalitat.
        */
        console.log(`Loading from file: ${filename}`);
    }
}

// Open/Closed Principle
// Principi obert/tancat

// Els objectes han d'estar oberts a l'extensió però tancats a la modificació.

class Shape {
    area() {
        // Això obliga les subclasses a implementar el mètode area
        throw new Error("Method 'area' must be implemented");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        // Retorna l'àrea del rectangle
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        // Retorna l'àrea del cercle
        return Math.PI * this.radius ** 2;
    }
}

class AreaCalculator {
    constructor(shapes) {
        /*
        Explicació:
        - Aquesta classe pot calcular l'àrea total d'una llista de formes.
        - Funciona gràcies al polimorfisme, ja que totes les formes implementen el mètode area().
        */
        this.shapes = shapes;
    }

    totalArea() {
        return this.shapes.reduce((total, shape) => total + shape.area(), 0);
    }
}

// Liskov Substitution Principle
// Principi de substitució de Liskov

// Les subclasses han de poder substituir la seva classe base sense trencar el programa.
class Bird {
    fly() {
        // Això actua com una interfície per a ocells que poden volar
        throw new Error("This bird can't fly");
    }
}

class Duck extends Bird {
    fly() {
        return "Duck is flying!";
    }
}

class Ostrich extends Bird {
    // L'estruç no pot volar, però pot tenir un comportament alternatiu
    run() {
        return "Ostrich is running!";
    }
}

// Interface Segregation Principle
// Principi de segregació d'interfícies

class Printer {
    print(document) {
        throw new Error("Method 'print' must be implemented");
    }
}

class Scanner {
    scan(document) {
        throw new Error("Method 'scan' must be implemented");
    }
}

class MultiFunctionPrinter extends Printer {
    print(document) {
        console.log(`Printing: ${document}`);
    }
}

class BasicPrinter extends Printer {
    print(document) {
        console.log(`Printing: ${document}`);
    }
}

// Dependency Inversion Principle
// Principi d'inversió de dependències

class LightBulb {
    turnOn() {
        console.log("LightBulb is on");
    }

    turnOff() {
        console.log("LightBulb is off");
    }
}

class Switch {
    constructor(device) {
        /*
        Explicació:
        - Aquesta classe controla un dispositiu que segueix la interfície esperada (LightBulb).
        - Això permet desconnectar la implementació del dispositiu concret.
        */
        this.device = device;
        this.isOn = false;
    }

    press() {
        // Alterna l'estat del dispositiu entre encès i apagat
        if (this.isOn) {
            this.device.turnOff();
        } else {
            this.device.turnOn();
        }
        this.isOn = !this.isOn;
    }
}

// Exemple d'ús
const bulb = new LightBulb();
const lightSwitch = new Switch(bulb);
lightSwitch.press(); // LightBulb is on
lightSwitch.press(); // LightBulb is off
