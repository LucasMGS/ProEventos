import { DateTimeFormatPipe } from "./DateTimeFormat.pipe";



describe('DateTimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateTimeFormatPipe('pt');
    expect(pipe).toBeTruthy();
  });
});
