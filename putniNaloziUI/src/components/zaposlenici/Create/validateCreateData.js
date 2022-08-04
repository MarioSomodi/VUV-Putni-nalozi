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
  if (!values.lozinka.trim()) {
    errors.lozinka = 'Lozinka je obavezna.';
  } else if (!values.lozinka.length > 6) {
    errors.lozinka = 'Lozinka mora imati vise od 6 karaktera.';
  } else if (values.lozinka !== values.lozinka2) {
    errors.lozinka2 = 'Lozinke se ne podudaraju.';
  }
  return errors;
}
