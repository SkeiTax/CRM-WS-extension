export class CanvasUtils {
  static createDiagonalStripePattern(
    ctx: CanvasRenderingContext2D,
    color: string,
    spacing: number,
    thicknessProcent: number
  ): CanvasPattern | null {
    const size = spacing; // размер квадрата, внутри которого будет одна диагональ

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternCanvas.height = size;

    const pctx = patternCanvas.getContext("2d");
    if (!pctx) return null;

    pctx.clearRect(0, 0, size, size);

    pctx.strokeStyle = color;
    pctx.lineWidth = thicknessProcent*Math.sin(45/180*Math.PI)*size;
    pctx.lineCap = "butt"; // важно для ровных краёв

    // Рисуем одну диагональную линию из нижнего левого в верхний правый угол
    pctx.beginPath();
    pctx.moveTo(-size, size);
    pctx.lineTo(size, -size);

    pctx.moveTo(0, size);
    pctx.lineTo(size, 0);

    pctx.moveTo(0, size*2);
    pctx.lineTo(size*2, 0);
    pctx.stroke();

    return ctx.createPattern(patternCanvas, "repeat");
  }
}
