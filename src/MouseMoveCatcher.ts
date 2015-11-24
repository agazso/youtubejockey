class MouseMoveCatcher {
  constructor(private lastPosX:number, private lastPosY:number) {
 
  }

  updatePosition(x:number, y:number) {
    this.lastPosX = x;
    this.lastPosY = y;
  }

  isMousePositionChanged(x:number, y:number) {
    if (this.lastPosX === x && this.lastPosY === y) {
      return false;
    }
    return true;
  }
}

