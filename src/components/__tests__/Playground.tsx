import { shallow } from 'enzyme';
import * as React from 'react';

import { mockRouterProps } from '../../mocks/components';
import { ExternalLibraryName, ExternalLibraryNames } from '../assessment/assessmentShape';
import Playground, { IPlaygroundProps } from '../Playground';

const baseProps = {
  editorValue: '',
  breakpoints: [],
  highlightedLines: [],
  isRunning: false,
  isDebugging: false,
  enableDebugging: true,
  activeTab: 0,
  editorSessionId: '',
  editorWidth: '50%',
  isEditorAutorun: false,
  sideContentHeight: 40,
  sourceChapter: 2,
  externalLibraryName: ExternalLibraryNames.NONE,
  output: [],
  replValue: '',
  websocketStatus: 0,
  handleBrowseHistoryDown: () => {},
  handleBrowseHistoryUp: () => {},
  handleChangeActiveTab: (n: number) => {},
  handleChapterSelect: (chapter: number) => {},
  handleEditorEval: () => {},
  handleEditorHeightChange: (height: number) => {},
  handleEditorValueChange: () => {},
  handleEditorWidthChange: (widthChange: number) => {},
  handleEditorUpdateBreakpoints: (breakpoints: string[]) => {},
  handleExternalSelect: (externalLibraryName: ExternalLibraryName) => {},
  handleGenerateLz: () => {},
  handleInterruptEval: () => {},
  handleInvalidEditorSessionId: () => {},
  handleReplEval: () => {},
  handleReplOutputClear: () => {},
  handleReplValueChange: (code: string) => {},
  handleSetEditorSessionId: (editorSessionId: string) => {},
  handleSetWebsocketStatus: (websocketStatus: number) => {},
  handleSideContentHeightChange: (h: number) => {},
  handleToggleEditorAutorun: () => {},
  handleDebuggerPause: () => {},
  handleDebuggerResume: () => {},
  handleDebuggerReset: () => {}
};

const testValueProps: IPlaygroundProps = {
  ...baseProps,
  ...mockRouterProps('/academy', {}),
  editorValue: 'Test value'
};

const playgroundLinkProps: IPlaygroundProps = {
  ...baseProps,
  ...mockRouterProps('/playground#lib=2&prgrm=CYSwzgDgNghgngCgOQAsCmUoHsCESCUA3EA', {}),
  editorValue: 'This should not show up'
};

test('Playground renders correctly', () => {
  const app = <Playground {...testValueProps} />;
  const tree = shallow(app);
  expect(tree.debug()).toMatchSnapshot();
});

test('Playground with link renders correctly', () => {
  const app = <Playground {...playgroundLinkProps} />;
  const tree = shallow(app);
  expect(tree.debug()).toMatchSnapshot();
});
