import { useState, useRef, useEffect } from "react";
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Stack,
  Chip,
  CircularProgress,
  Slide,
  Zoom,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useSendMessageMutation } from "../../features/chat/chatApi";
import { getFallbackReply, QUICK_PROMPTS } from "../../utils/chatFallback";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your Scrap Management assistant. Ask me about selling, buying, inventory, or how the platform works.",
};

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1.5,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.25,
          maxWidth: "85%",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          bgcolor: isUser ? "primary.main" : "#fff",
          color: isUser ? "#fff" : "text.primary",
          border: isUser ? "none" : "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
          {message.content}
        </Typography>
      </Paper>
    </Box>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const messagesEndRef = useRef(null);
  const useBackend = import.meta.env.VITE_CHAT_USE_BACKEND !== "false";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const history = [...messages, userMessage]
      .filter((m) => m.id !== "welcome")
      .map(({ role, content }) => ({ role, content }));

    let reply;

    if (useBackend) {
      try {
        const response = await sendMessage({ message: trimmed, history }).unwrap();
        reply = response.reply ?? response.message ?? response.content;
      } catch {
        reply = getFallbackReply(trimmed);
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 400));
      reply = getFallbackReply(trimmed);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: reply,
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const showQuickPrompts = messages.length === 1;

  return (
    <>
      <Zoom in>
        <Fab
          color="primary"
          aria-label="Open AI chat assistant"
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            boxShadow: "0 8px 24px rgba(177, 93, 93, 0.35)",
          }}
        >
          {open ? <CloseIcon /> : <SmartToyIcon />}
        </Fab>
      </Zoom>

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: { xs: "calc(100vw - 32px)", sm: 380 },
            height: 520,
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              bgcolor: "primary.main",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SmartToyIcon fontSize="small" />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Scrap Assistant
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Ask anything about the platform
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "#fff" }}
              aria-label="Close chat"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              px: 2,
              py: 2,
              bgcolor: "#f8f9fb",
            }}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  Thinking...
                </Typography>
              </Box>
            )}

            {showQuickPrompts && (
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                {QUICK_PROMPTS.map((prompt) => (
                  <Chip
                    key={prompt}
                    label={prompt}
                    size="small"
                    variant="outlined"
                    onClick={() => handleSend(prompt)}
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": { bgcolor: "rgba(177, 93, 93, 0.08)" },
                    }}
                  />
                ))}
              </Stack>
            )}

            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "#fff",
              display: "flex",
              gap: 1,
              alignItems: "flex-end",
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={3}
              size="small"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            />
            <IconButton
              color="primary"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                "&:hover": { bgcolor: "primary.dark" },
                "&.Mui-disabled": { bgcolor: "action.disabledBackground" },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}

export default ChatWidget;
