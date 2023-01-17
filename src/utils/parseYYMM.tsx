function parseYYMM(yymm: string) {
  const [year, month] = yymm.split('/');
  return { year: parseInt(year, 10), month: parseInt(month, 10) };
}

export default parseYYMM;
