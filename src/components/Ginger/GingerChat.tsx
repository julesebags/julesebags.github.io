import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, X } from 'lucide-react'
import {
  GINGER_ANSWERS,
  matchGingerAnswer,
  pickGingerFallback,
} from '../../data/gingerAnswers'
import styles from './GingerChat.module.css'

/** Beat before she answers, so replies don't land instantly. */
const THINKING_MS = 700
/** Suggestion chips shown at once, so the panel stays compact. */
const VISIBLE_SUGGESTIONS = 3

const GREETING =
  "hi im ginger :) ask me about julie. or about me — i'm also very interesting."

interface ChatMessage {
  id: number
  from: 'user' | 'ginger'
  text: string
}

interface GingerChatProps {
  onClose: () => void
}

/**
 * "GingerGPT" — a spokesdog Q&A panel. There's no model behind it:
 * questions are matched to a hand-written script by keyword, and
 * anything unrecognized gets a shrug plus the suggestion chips.
 */
export function GingerChat({ onClose }: GingerChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: 'ginger', text: GREETING },
  ])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [asked, setAsked] = useState<string[]>([])

  const nextId = useRef(0)
  const logRef = useRef<HTMLDivElement>(null)
  const replyTimer = useRef(0)

  const ask = (question: string) => {
    window.clearTimeout(replyTimer.current)

    nextId.current += 1
    const userMessage: ChatMessage = {
      id: nextId.current,
      from: 'user',
      text: question,
    }
    setMessages((prev) => [...prev, userMessage])
    setDraft('')
    setThinking(true)

    const answer = matchGingerAnswer(question)
    if (answer) {
      setAsked((prev) =>
        prev.includes(answer.id) ? prev : [...prev, answer.id],
      )
    }

    const lines = answer ? answer.reply : [pickGingerFallback()]

    replyTimer.current = window.setTimeout(() => {
      // Ids are assigned outside the updater so it stays a pure function.
      const replies = lines.map((text) => {
        nextId.current += 1
        return { id: nextId.current, from: 'ginger' as const, text }
      })
      setThinking(false)
      setMessages((prev) => [...prev, ...replies])
    }, THINKING_MS)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (text) ask(text)
  }

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, thinking])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  useEffect(() => () => window.clearTimeout(replyTimer.current), [])

  // Once she's answered everything, the whole set comes back around.
  const unasked = GINGER_ANSWERS.filter((answer) => !asked.includes(answer.id))
  const suggestions = (unasked.length ? unasked : GINGER_ANSWERS).slice(
    0,
    VISIBLE_SUGGESTIONS,
  )

  return (
    <motion.div
      className={styles.chat}
      role="dialog"
      aria-label="Chat with Ginger"
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <header className={styles.header}>
        <span className={styles.title}>GingerGPT</span>
        <span className={styles.subtitle}>julie's dog · 9 yrs</span>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close chat"
        >
          <X size={15} strokeWidth={2} />
        </button>
      </header>

      <div className={styles.log} ref={logRef}>
        {messages.map((message) => (
          <p
            key={message.id}
            className={`${styles.message} ${
              message.from === 'user' ? styles.fromUser : styles.fromGinger
            }`}
          >
            {message.text}
          </p>
        ))}

        {thinking && (
          <p
            className={`${styles.message} ${styles.fromGinger} ${styles.typing}`}
            aria-label="Ginger is typing"
          >
            <span />
            <span />
            <span />
          </p>
        )}
      </div>

      <div className={styles.suggestions}>
        {suggestions.map((answer) => (
          <button
            key={answer.id}
            type="button"
            className={styles.chip}
            onClick={() => ask(answer.question)}
          >
            {answer.question}
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="ask ginger something..."
          aria-label="Ask Ginger a question"
          autoComplete="off"
        />
        <button
          type="submit"
          className={styles.send}
          disabled={!draft.trim()}
          aria-label="Send"
        >
          <ArrowUp size={15} strokeWidth={2.25} />
        </button>
      </form>
    </motion.div>
  )
}
