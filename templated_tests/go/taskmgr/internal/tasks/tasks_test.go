package tasks

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"testing"
)

func TestTaskManager(t *testing.T) {
	// Create a temporary directory for test files
	dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
	if err != nil {
		t.Fatalf("Failed to create temp dir: %v", err)
	}
	defer os.RemoveAll(dir) // Clean up

	testFile := filepath.Join(dir, "tasks.json")
	store := NewFileStore(testFile)
	manager := NewTaskManager(store)

	// Add a task
	if err := manager.Add(Task{Title: "First"}); err != nil {
		t.Fatal("Error adding task:", err)
	}

	list := manager.List()
	if len(list) != 1 || list[0].Title != "First" {
		t.Errorf("Expected one task with title 'First', got %v", list)
	}

	// Mark it done
	err = manager.MarkDone("0")
	if err != nil {
		t.Error("MarkDone returned an error:", err)
	}

	list = manager.List()
	if !list[0].Done {
		t.Error("Expected task to be marked done")
	}

	// Ensure persistence: create a new manager and check again
	newStore := NewFileStore(testFile)
	newManager := NewTaskManager(newStore)
	newList := newManager.List()
	if len(newList) != 1 || newList[0].Title != "First" || !newList[0].Done {
		t.Errorf("Expected persisted task 'First' to be done, got %v", newList)
	}
}

func TestMarkDoneIndexOutOfRange(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    err = manager.Add(Task{Title: "First"})
    if err != nil {
        t.Fatal("Error adding task:", err)
    }

    err = manager.MarkDone("10")
    if err == nil || err.Error() != "invalid index" {
        t.Errorf("Expected 'invalid index' error, got %v", err)
    }
}


func TestFindByDescriptionNoMatch(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    // Add tasks with different descriptions
    manager.Add(Task{Title: "First", Description: "Desc1"})
    manager.Add(Task{Title: "Second", Description: "Desc2"})

    results := manager.FindByDescription("NonExistentDesc")
    if len(results) != 0 {
        t.Errorf("Expected no tasks to match, got %v", results)
    }
}


func TestCountDoneNoTasksDone(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    // Add tasks but do not mark them as done
    manager.Add(Task{Title: "First"})
    manager.Add(Task{Title: "Second"})

    count := manager.CountDone()
    if count != 0 {
        t.Errorf("Expected 0 tasks done, got %d", count)
    }
}


func TestUndoDoneInvalidIndex(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    // Add a task to ensure the list is not empty
    manager.Add(Task{Title: "First"})

    err = manager.UndoDone("1") // Invalid index
    if err == nil || err.Error() != "invalid index" {
        t.Errorf("Expected 'invalid index' error, got %v", err)
    }
}


func TestRemoveInvalidIndex(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    // Add a task to ensure the list is not empty
    manager.Add(Task{Title: "First"})

    err = manager.Remove("1") // Invalid index
    if err == nil || err.Error() != "invalid index" {
        t.Errorf("Expected 'invalid index' error, got %v", err)
    }
}


func TestBulkAdd(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    tasksToAdd := []Task{
        {Title: "Task1"},
        {Title: "Task2"},
        {Title: "Task3"},
    }
    err = manager.BulkAdd(tasksToAdd)
    if err != nil {
        t.Fatal("Error in BulkAdd:", err)
    }

    list := manager.List()
    if len(list) != 3 {
        t.Errorf("Expected 3 tasks, got %d", len(list))
    }
}


func TestFindByTitleNotFound(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    manager.Add(Task{Title: "First"})
    result := manager.FindByTitle("NonExistent")
    if result != nil {
        t.Errorf("Expected nil for non-existent title, got %v", result)
    }
}


func TestMarkDoneInvalidIndex(t *testing.T) {
    dir, err := ioutil.TempDir("", "taskmgr_tasks_test")
    if err != nil {
        t.Fatalf("Failed to create temp dir: %v", err)
    }
    defer os.RemoveAll(dir)

    testFile := filepath.Join(dir, "tasks.json")
    store := NewFileStore(testFile)
    manager := NewTaskManager(store)

    err = manager.MarkDone("invalid")
    if err == nil {
        t.Error("Expected error for invalid index, got nil")
    }
}

