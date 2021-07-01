export default function validateInfo(values) {
  let errors = {};
  if (!values.korisnickoIme.trim()) {
    errors.korisnickoIme = 'Korisnicko ime je obavezno.';
  }
  if (!values.ime.trim()) {
    errors.ime = 'Ime je obavezno.';
  }
  if (!values.prezime.trim()) {
    errors.prezime = 'Prezime je obavezno.';
  }
  if (!values.lozinka.trim()) {
    errors.lozinka = 'Lozinka je obavezna.';
  } else if (!values.lozinka.length > 6) {
    errors.lozinka = 'Lozinka mora imati vise od 6 karaktera.';
  } else if (values.lozinka !== values.lozinka2) {
    errors.lozinka2 = 'Lozinke se nepodudaraju.';
  }
  return errors;
}
