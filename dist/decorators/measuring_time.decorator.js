"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureExecutionTime = void 0;
const MeasureExecutionTime = (smile) => {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const start = performance.now();
            try {
                return originalMethod.apply(this, args);
            }
            finally {
                const end = performance.now();
                console.log(`${smile} Execution time of ${propertyKey}: ${(end - start).toFixed(2)} ms`);
            }
        };
        return descriptor;
    };
};
exports.MeasureExecutionTime = MeasureExecutionTime;
