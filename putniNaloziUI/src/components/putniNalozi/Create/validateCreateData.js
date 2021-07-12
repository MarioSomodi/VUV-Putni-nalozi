export default function validateInfo(values) {
  let errors = {};
  if (!values.polaziste.trim()) {
    errors.polaziste = 'Polaziste je obavezno.';
  }
  if (!values.odrediste.trim()) {
    errors.odrediste = 'Odrediste je obavezno.';
  }
  if (!values.svrha.trim()) {
    errors.svrha = 'Svrha je obavezna.';
  }
  if (!values.datumOdlaska.trim()) {
    errors.datumOdlaska = 'Datum odlaska je obavezan.';
  } else {
    var inputDate = new Date(values.datumOdlaska);
    var currentDate = new Date();
    if (inputDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
      errors.datumOdlaska =
        'Datum odlaska ne moze biti manji od danasnjeg datuma.';
    }
  }
  if (!values.brojDana.trim()) {
    errors.brojDana = 'Broj dana je obavezan.';
  } else if (values.brojDana <= 0) {
    errors.brojDana = 'Broj dana mora biti pozitivan i ne smije biti 0.';
  }
  return errors;
}
