export const rotateToPoint = (
  mx: number,
  my: number,
  pivotX: number,
  pivotY: number
) => {
  const dist_Y = my - pivotY;
  const dist_X = mx - pivotX;
  const angle = Math.atan2(dist_Y, dist_X);
  //var degrees = angle * 180/ Math.PI;
  return angle;
};
