export default function validateInfo(values) {
  const errors = {};
  if (!values.ime.trim()) {
    errors.ime = 'Ime je obavezno.';
  }
  if (!values.prezime.trim()) {
    errors.prezime = 'Prezime je obavezno.';
  }
  if (!values.korisnickoIme.trim()) {
    errors.korisnickoIme = 'Korisničko ime je obavezno.';
  }
  if (!values.odjel.trim()) {
    errors.odjel = 'Morate odabrati odjel.';
  }
  if (!values.uloga.trim()) {
    errors.uloga = 'Morate odabrati ulogu.';
  }
  if (values.rola === null) {
    errors.rolaToSet = values.rolaToSet;
  } else if (!values.rola === '') {
    errors.rola = 'Morate odabrati rolu.';
  }
  return errors;
}
