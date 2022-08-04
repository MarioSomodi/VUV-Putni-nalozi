export default function validateInfo(values) {
  const errors = {};
  if (!values.username.trim()) {
    errors.username = 'Korisničko name je obavezno.';
  }
  if (!values.name.trim()) {
    errors.name = 'Ime je obavezno.';
  }
  if (!values.lastname.trim()) {
    errors.lastname = 'Prezime je obavezno.';
  }
  if (!values.password.trim()) {
    errors.password = 'Lozinka je obavezna.';
  } else if (!values.password.length > 6) {
    errors.password = 'Lozinka mora imati vise od 6 karaktera.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Lozinke se ne podudaraju.';
  }
  return errors;
}
