import { expect } from 'chai';
import 'mocha';
import HistoryManager from '../src/modules/HistoryManager.js';

describe('HistoryManager', () => {
    let historyManager;

    beforeEach(() => {
        historyManager = new HistoryManager();
    });

    it('should add a record and retrieve it', () => {
        const record = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        historyManager.addRecord(record);

        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(1);
        expect(allHistory[0]).to.deep.equal(record);
    });

    it('should import history correctly and handle errors', () => {
        const validJson = JSON.stringify([
            { operationName: 'add', leftOperand: 2, rightOperand: 3, result: 5 },
            { operationName: 'subtract', leftOperand: 5, rightOperand: 2, result: 3 }
        ]);
    
        historyManager.importHistory(validJson);
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(2);
    
        const invalidJson = '{ invalid json }';
        expect(() => historyManager.importHistory(invalidJson)).to.throw('Failed to import history');
    
        const invalidRecordJson = JSON.stringify([
            { operationName: 'add', leftOperand: 2, rightOperand: 3, result: 'invalid' }
        ]);
        expect(() => historyManager.importHistory(invalidRecordJson)).to.throw('Failed to import history');
    });


    it('should export history as a JSON string', () => {
        const record = { operationName: 'add', leftOperand: 2, rightOperand: 3, result: 5 };
        historyManager.addRecord(record);
    
        const exportedHistory = historyManager.exportHistory();
        expect(exportedHistory).to.equal(JSON.stringify([record]));
    });


    it('should undo the last operation correctly', () => {
        const record1 = { operationName: 'add', leftOperand: 2, rightOperand: 3, result: 5 };
        const record2 = { operationName: 'subtract', leftOperand: 5, rightOperand: 2, result: 3 };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const undoneRecord = historyManager.undoLastOperation();
        expect(undoneRecord).to.deep.equal(record2);
    
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(1);
        expect(allHistory[0]).to.deep.equal(record1);
    
        const undoEmpty = historyManager.undoLastOperation();
        expect(undoEmpty).to.deep.equal(record1);
    
        const undoNull = historyManager.undoLastOperation();
        expect(undoNull).to.be.null;
    });


    it('should return null for empty history in getLastRecord', () => {
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.be.null;
    });



});