
// 更新游戏结果（selectList）
export const UPDATE_GAME_SELECTLIST = 'UPDATE_GAME_SELECTLIST';

// 更新游戏状态
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';

// 三个状态：blank（未开始游戏） | loading（游戏正在加载） | gaming（游戏中）
export enum GameStatus {
  Blank = 'blank',
  Loading = 'loading',
  Gaming = 'gaming'
}
