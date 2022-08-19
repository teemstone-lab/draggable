# Svelte Draggable Window Project

Svelte 언어 기반 Drag 가능한 Dialog를 구현하는 프로젝트 홈페이지로, Teemstone 내 Pair-programming 학습 프로젝트 용도로 생성된 Repository입니다.

## Reference System

- [React Mosaic Github](https://github.com/nomcopter/react-mosaic)
- [React Mosaic Demo Page](https://nomcopter.github.io/react-mosaic/)

## Reference Page

- [Testing-library 사용을 위한 Role 정의](https://www.w3.org/WAI/PF/HTML/wiki/RoleAttribute)
- [Testing-library 공식 사용 문서](https://testing-library.com/docs/)
- [Svelte 공식 사용 문서](https://svelte.dev/docs)

## 구현 필요 기능
- TDD를 고려하지 않고 대상 프로그램의 기능 위주로 구성
- 모든 기능을 설명한 것은 아니고 주요 기능만 설명한 것으로, 필요 시 추가 기능을 구현 권장

|기능|구현 여부|
|---|---|
|Dialog가 배치될 공간(Panel)을 생성해야 한다.|#9|
|Dialog를 추가할 수 있는 버튼이 있어야 한다.|#11|
|Dialog 추가 버튼을 누르면 한개의 Dialog가 추가되어야 한다.|#11|
|Dialog 별로 X 버튼이 있어야 한다.|X|
|Dialog의 X버튼을 누르면 해당 Dialog가 닫혀야 한다.|X|
|Dialog가 닫힐 때 다른 Dialog들은 닫힌 Dialog의 공간을 점유해야 한다.|X|
|Dialog 별로 Split 버튼이 있어야 한다.|X|
|Dialog Split 버튼을 누르면 현재의 Dialog 크기를 기준으로 <ul><li>W>H일 경우 열분할,</li><li>H>W일 경우 행분할을 해야 한다.</li></ul>|X|
|Dialog 제목바에 마우스를 위치하면 이동 가능한 상태를 표시할 수 있어야 한다.|X|
|Dialog 제목바를 드래그하면 위치를 이동할 수 있어야 한다.|X|
|Dialog 테두리에 마우스를 위치하면 크기 변경 가능한 상태를 표시할 수 있어야 한다.|X|
|Dialog 테두리를 드래그하면 크기 변경이 가능해야 한다.|X|
|Dialog 크기 변경이 완료되면 주변의 다른 Dialog도 맞춰서 크기 변경이 이루어져야 한다.|X|



