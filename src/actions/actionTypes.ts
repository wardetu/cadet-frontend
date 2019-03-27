import { Action as ReduxAction } from 'redux'

export interface IAction extends ReduxAction {
  payload: any
}

/** Academy */
export const SAVE_CANVAS = 'SAVE_CANVAS'

/** Commons (used by many) */
export const LOG_OUT = 'LOG_OUT'

/** Playground */
export const CHANGE_QUERY_STRING = 'CHANGE_QUERY_STRING'
export const GENERATE_LZ_STRING = 'GENERATE_LZ_STRING'

/** Interpreter */
export const BEGIN_INTERRUPT_EXECUTION = 'BEGIN_INTERRUPT_EXECUTION'
export const END_INTERRUPT_EXECUTION = 'END_INTERRUPT_EXECUTION'
export const EVAL_INTERPRETER_ERROR = 'EVAL_INTERPRETER_ERROR'
export const EVAL_INTERPRETER_SUCCESS = 'EVAL_INTERPRETER_SUCCESS'
export const HANDLE_CONSOLE_LOG = 'HANDLE_CONSOLE_LOG'
export const BEGIN_DEBUG_PAUSE = 'BEGIN_DEBUG_PAUSE'
export const END_DEBUG_PAUSE = 'END_DEBUG_PAUSE'
export const DEBUG_RESUME = 'DEBUG_RESUME'
export const DEBUG_RESET = 'DEBUG_RESET'
export const HIGHLIGHT_LINE = 'HIGHLIGHT_LINE'

/** Workspace */
export const BEGIN_CLEAR_CONTEXT = 'BEGIN_CLEAR_CONTEXT'
export const BROWSE_REPL_HISTORY_DOWN = 'BROWSE_REPL_HISTORY_DOWN'
export const BROWSE_REPL_HISTORY_UP = 'BROWSE_REPL_HISTORY_UP'
export const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB'
export const CHANGE_EDITOR_WIDTH = 'CHANGE_EDITOR_WIDTH'
export const CHANGE_PLAYGROUND_EXTERNAL = 'CHANGE_PLAYGROUND_EXTERNAL'
export const CHANGE_SIDE_CONTENT_HEIGHT = 'CHANGE_SIDE_CONTENT_HEIGHT'
export const CHAPTER_SELECT = 'CHAPTER_SELECT'
export const CLEAR_REPL_INPUT = 'CLEAR_REPL_INPUT'
export const CLEAR_REPL_OUTPUT = 'CLEAR_REPL_OUTPUT'
export const END_CLEAR_CONTEXT = 'END_CLEAR_CONTEXT'
export const ENSURE_LIBRARIES_LOADED = 'ENSURE_LIBRARIES_LOADED'
export const EVAL_EDITOR = 'EVAL_EDITOR'
export const EVAL_REPL = 'EVAL_REPL'
export const PLAYGROUND_EXTERNAL_SELECT = 'PLAYGROUND_EXTERNAL_SELECT '
export const RESET_WORKSPACE = 'RESET_WORKSPACE'
export const SEND_REPL_INPUT_TO_OUTPUT = 'SEND_REPL_INPUT_TO_OUTPUT'
export const UPDATE_CURRENT_ASSESSMENT_ID = 'UPDATE_CURRENT_ASSESSMENT_ID'
export const UPDATE_CURRENT_SUBMISSION_ID = 'UPDATE_CURRENT_SUBMISSION_ID'
export const UPDATE_EDITOR_VALUE = 'UPDATE_EDITOR_VALUE'
export const UPDATE_EDITOR_BREAKPOINTS = 'UPDATE_EDITOR_BREAKPOINTS'
export const UPDATE_HAS_UNSAVED_CHANGES = 'UPDATE_HAS_UNSAVED_CHANGES'
export const UPDATE_REPL_VALUE = 'UPDATE_REPL_VALUE'

/** Session */
export const FETCH_ANNOUNCEMENTS = 'FETCH_ANNOUNCEMENTS'
export const FETCH_AUTH = 'FETCH_AUTH'
export const FETCH_ASSESSMENT = 'FETCH_ASSESSMENT'
export const FETCH_ASSESSMENT_OVERVIEWS = 'FETCH_ASSESSMENT_OVERVIEWS'
export const FETCH_GRADING = 'FETCH_GRADING'
export const FETCH_GRADING_OVERVIEWS = 'FETCH_GRADING_OVERVIEWS'
export const LOGIN = 'LOGIN'
export const SET_TOKENS = 'SET_TOKENS'
export const SET_USER = 'SET_USER'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const SUBMIT_ASSESSMENT = 'SUBMIT_ASSESSMENT'
export const SUBMIT_GRADING = 'SUBMIT_GRADING'
export const UPDATE_HISTORY_HELPERS = 'UPDATE_HISTORY_HELPERS'
export const UPDATE_ASSESSMENT_OVERVIEWS = 'UPDATE_ASSESSMENT_OVERVIEWS'
export const UPDATE_ASSESSMENT = 'UPDATE_ASSESSMENT'
export const UPDATE_GRADING_OVERVIEWS = 'UPDATE_GRADING_OVERVIEWS'
export const UPDATE_GRADING = 'UPDATE_GRADING'
