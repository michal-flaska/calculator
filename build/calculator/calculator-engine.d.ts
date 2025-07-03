import type { Operation, DisplayState } from "../types/index.js";
export declare class CalculatorEngine {
    private currentOperand;
    private previousOperand;
    private operation;
    private shouldResetScreen;
    constructor();
    reset(): void;
    inputNumber(number: string): void;
    chooseOperation(operation: Operation): void;
    calculate(): void;
    delete(): void;
    percentage(): void;
    private formatNumber;
    private handleError;
    getDisplayState(): DisplayState;
}
export default CalculatorEngine;
//# sourceMappingURL=calculator-engine.d.ts.map