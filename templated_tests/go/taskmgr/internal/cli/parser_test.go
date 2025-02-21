package cli

import "testing"

func TestParseArgs(t *testing.T) {
	cmd, rest := ParseArgs([]string{"add", "MyTask"})
	if cmd != "add" {
		t.Errorf("Expected cmd 'add', got '%s'", cmd)
	}
	if len(rest) != 1 || rest[0] != "MyTask" {
		t.Errorf("Expected args ['MyTask'], got %v", rest)
	}
}

func TestParseArgsEmptyInput(t *testing.T) {
    cmd, rest := ParseArgs([]string{})
    if cmd != "" {
        t.Errorf("Expected cmd '', got '%s'", cmd)
    }
    if rest != nil {
        t.Errorf("Expected args nil, got %v", rest)
    }
}

