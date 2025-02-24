import { expect } from 'chai';
import 'mocha';
import HistoryManager, { HistoryRecord } from '../src/modules/HistoryManager';

describe('HistoryManager', () => {
    let historyManager: HistoryManager;

    beforeEach(() => {
        historyManager = new HistoryManager();
    });

    it('should add a record and retrieve it', () => {
        const record: HistoryRecord = {
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

    it('should return records matching the specified operation name', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 10,
            rightOperand: 4,
            result: 6,
        };
        const record3: HistoryRecord = {
            operationName: 'add',
            leftOperand: 1,
            rightOperand: 1,
            result: 2,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
        historyManager.addRecord(record3);
    
        const searchResults = historyManager.searchHistoryByOperationName('add');
        expect(searchResults).to.have.lengthOf(2);
        expect(searchResults).to.deep.include(record1);
        expect(searchResults).to.deep.include(record3);
    });


    it('should return null when history is empty', () => {
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.be.null;
    });


    it('should export history as a JSON string', () => {
        const record: HistoryRecord = {
            operationName: 'add',
            leftOperand: 1,
            rightOperand: 2,
            result: 3,
        };
        historyManager.addRecord(record);
    
        const exportedHistory = historyManager.exportHistory();
        expect(exportedHistory).to.equal(JSON.stringify([record]));
    });


    it('should clear the history', () => {
        const record: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        historyManager.addRecord(record);
    
        historyManager.clearHistory();
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.be.empty;
    });


    it('should undo the last operation', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 10,
            rightOperand: 4,
            result: 6,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const undoneRecord = historyManager.undoLastOperation();
        expect(undoneRecord).to.deep.equal(record2);
    
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(1);
        expect(allHistory[0]).to.deep.equal(record1);
    });


    it('should return the last record', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 10,
            rightOperand: 4,
            result: 6,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.deep.equal(record2);
    });



});