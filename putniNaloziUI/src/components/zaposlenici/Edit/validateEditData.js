export default function validateInfo(values) {
  let errors = {};
  if (!values.ime.trim()) {
    errors.ime = 'Polaziste je obavezno.';
  }
  if (!values.prezime.trim()) {
    errors.prezime = 'Odrediste je obavezno.';
  }
  if (!values.korisnickoIme.trim()) {
    errors.korisnickoIme = 'Svrha je obavezna.';
  }
  if (!values.odjel.trim()) {
    errors.odjel = 'Datum odlaska je obavezan.';
  }
  if (!values.uloga.trim()) {
    errors.uloga = 'Datum odlaska je obavezan.';
  }
  return errors;
}
