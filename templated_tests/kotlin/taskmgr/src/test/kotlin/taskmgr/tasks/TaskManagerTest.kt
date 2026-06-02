package taskmgr.tasks

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.io.File
import java.nio.file.Files

class TaskManagerTest {

    private lateinit var tempFile: File
    private lateinit var fileStore: FileStore
    private lateinit var taskManager: TaskManager

    @BeforeEach
    fun setUp() {
        tempFile = Files.createTempFile("tasks", ".json").toFile()
        fileStore = FileStore(tempFile.absolutePath)
        taskManager = TaskManager(fileStore)
    }
    fun setUp() {
        tempFile = Files.createTempFile("tasks", ".json").toFile()
        fileStore = FileStore(tempFile.absolutePath)
        taskManager = TaskManager(fileStore)
    }
    fun setUp() {
                fileStore = FileStore(tempFile.absolutePath)
        taskManager = TaskManager(fileStore)
    }

    @Test
    fun `add task adds it to the manager`() {
        val task = Task("New Task")
        taskManager.add(task)

        val tasks = taskManager.list()
        assertEquals(1, tasks.size)
        assertEquals("New Task", tasks[0].title)
        assertFalse(tasks[0].done)
    }

}
