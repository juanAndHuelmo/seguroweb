import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styled, { keyframes } from 'styled-components';
import { useAppConfig } from '../../Context/AppConfigContext';
import { getAssetUrl } from '../../Config/api';

emailjs.init('FWhla7meyPyV00HZZ');

/* ===== TUS ESTILOS ORIGINALES ===== */
const fadeIn = keyframes`
  from { opacity:0; transform:translateY(10px);}
  to { opacity:1; transform:translateY(0);}
`;

const Overlay = styled.div`
  position:fixed; inset:0; background:rgba(0,0,0,0.45);
  display:flex; justify-content:center; align-items:center; padding:20px; z-index: 1000;
`;

const Container = styled.div`
  width:100%; max-width:720px; background:white; border-radius:24px;
  display:flex; flex-direction:column; max-height:92vh; overflow:hidden;
  animation:${fadeIn} .3s ease;
`;

const Content = styled.div`
  padding:20px; overflow-y:auto; flex:1;
`;

const Footer = styled.div`
  position:sticky; bottom:0; background:white; padding:15px; border-top:1px solid #eee;
`;

const Tabs = styled.div`
  display: flex; justify-content: center; align-items: center; padding: 10px 0; overflow-x:auto;
`;

const Tab = styled.button`
  min-width:65px; border-radius:12px; border:2px solid ${p=>p.$active?'#064e3b':'transparent'};
  background:${p=>p.$active?'#ecfdf5':'#fff'}; padding:6px; cursor:pointer;
  display:flex; flex-direction:column; align-items:center;
  img{ width:60px; height:60px; object-fit:cover; border-radius:10px; opacity:${p=>p.$active?1:0.6}; }
  span{ font-size:12px; margin-top:4px; }
`;

const Grid = styled.div`
  display:grid; grid-template-columns:1fr 1fr; gap:10px;
  @media(max-width:600px){ grid-template-columns:1fr; }
`;

const Input = styled.input`
  padding:12px; border-radius:8px; border:1px solid ${p=>p.$invalid?'#dc2626':'#ccc'};
  outline-color: ${p=>p.$invalid?'#dc2626':'#064e3b'};
`;

const Select = styled.select`
  padding:12px; border-radius:8px; border:1px solid ${p=>p.$invalid?'#dc2626':'#ccc'}; background: white;
  outline-color: ${p=>p.$invalid?'#dc2626':'#064e3b'};
`;

const Button = styled.button`
  width:100%; padding:16px; border:none; border-radius:12px;
  background:${p=>p.disabled?'#ccc':'#064e3b'}; color:white;
  font-weight:600; cursor: pointer;
`;

const InputGroup = styled.div`
  display: flex; flex-direction: column; gap: 8px; grid-column: span 2;
  label { font-size: 0.85rem; font-weight: 600; margin-left: 4px; }
`;

const DynamicItem = styled.div`
  border: 1px solid #eee; padding: 10px; border-radius: 12px; margin-bottom: 10px; background: #fafafa;
`;

const Field = styled.div`
  display: flex; flex-direction: column; gap: 4px;
  ${p=>p.$full && 'grid-column: span 2;'}
  @media(max-width:600px){ grid-column: span 1; }
`;

const ErrorText = styled.small`
  color: #dc2626; font-size: 0.78rem; line-height: 1.25; margin-left: 4px;
`;

const currentYear = new Date().getFullYear();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const digitsOnly = value => String(value || '').replace(/\D/g, '');
const isPositiveNumber = value => Number(value) > 0;
const isValidDate = value => Boolean(value) && !Number.isNaN(new Date(value).getTime());

const isValidUruguayanCi = value => {
  const digits = digitsOnly(value);
  if (digits.length < 7 || digits.length > 8) return false;

  const normalized = digits.padStart(8, '0');
  const multipliers = [2, 9, 8, 7, 6, 3, 4];
  const sum = multipliers.reduce((total, multiplier, index) => {
    return total + Number(normalized[index]) * multiplier;
  }, 0);
  const checkDigit = (10 - (sum % 10)) % 10;

  return checkDigit === Number(normalized[7]);
};

const getAgeFromDate = value => {
  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
};

const buildValidationErrors = form => {
  const errors = {};
  const { insuranceType: type, common } = form;
  const section = form[type];
  const trimmedName = common.fullName.trim();
  const phoneDigits = digitsOnly(common.phone);
  const ciDigits = digitsOnly(common.ci);

  if (!trimmedName) {
    errors['common.fullName'] = 'Ingresá tu nombre completo';
  } else if (trimmedName.length < 3 || !trimmedName.includes(' ')) {
    errors['common.fullName'] = 'Ingresá nombre y apellido';
  }

  if (!common.email.trim()) {
    errors['common.email'] = 'Ingresá tu email';
  } else if (!emailRegex.test(common.email.trim())) {
    errors['common.email'] = 'Ingresá un email válido';
  }

  if (!common.phone.trim()) {
    errors['common.phone'] = 'Ingresá tu celular';
  } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors['common.phone'] = 'Ingresá un celular válido';
  }

  if (common.birthDate) {
    const age = getAgeFromDate(common.birthDate);
    if (!isValidDate(common.birthDate) || age < 18 || age > 100) {
      errors['common.birthDate'] = 'La fecha debe corresponder a un mayor de 18 años';
    }
  }

  if (common.ci && !isValidUruguayanCi(ciDigits)) {
    errors['common.ci'] = 'Ingresá una cédula válida';
  }

  if (type === 'vehicles') {
    const year = Number(section.year);
    if (!section.brand.trim()) errors['vehicles.brand'] = 'Ingresá la marca';
    if (!section.model.trim()) errors['vehicles.model'] = 'Ingresá el modelo';
    if (!section.year) {
      errors['vehicles.year'] = 'Ingresá el año';
    } else if (!Number.isInteger(year) || year < 1950 || year > currentYear + 1) {
      errors['vehicles.year'] = `Ingresá un año entre 1950 y ${currentYear + 1}`;
    }
    if (!section.zone) errors['vehicles.zone'] = 'Seleccioná el departamento';
    if (!section.coverage) errors['vehicles.coverage'] = 'Seleccioná la cobertura';
  }

  if (type === 'home') {
    if (!section.type) errors['home.type'] = 'Seleccioná el tipo de vivienda';
    if (!section.use) errors['home.use'] = 'Seleccioná el uso';
    if (!section.area) {
      errors['home.area'] = 'Ingresá los metros cuadrados';
    } else if (!isPositiveNumber(section.area)) {
      errors['home.area'] = 'Los metros deben ser mayores a 0';
    }
    if (!section.location.trim()) errors['home.location'] = 'Ingresá la localidad o barrio';
    if (!section.construction) errors['home.construction'] = 'Seleccioná el tipo de construcción';
    if (!section.coverage) errors['home.coverage'] = 'Seleccioná la cobertura';
  }

  if (type === 'commerce') {
    if (!section.type.trim()) errors['commerce.type'] = 'Ingresá el rubro';
    if (!section.area) {
      errors['commerce.area'] = 'Ingresá los metros cuadrados';
    } else if (!isPositiveNumber(section.area)) {
      errors['commerce.area'] = 'Los metros deben ser mayores a 0';
    }
    if (!section.location.trim()) errors['commerce.location'] = 'Ingresá la ubicación';
    if (!section.security) errors['commerce.security'] = 'Seleccioná una medida de seguridad';
  }

  if (type === 'life') {
    if (!section.smoker) errors['life.smoker'] = 'Indicá si sos fumador';
    if (!section.income) {
      errors['life.income'] = 'Ingresá el ingreso mensual';
    } else if (!isPositiveNumber(section.income)) {
      errors['life.income'] = 'El ingreso debe ser mayor a 0';
    }
    if (!section.coverage) errors['life.coverage'] = 'Seleccioná el capital a asegurar';
  }

  if (type === 'travel') {
    section.destinations.forEach((destination, index) => {
      if (!destination.name.trim()) errors[`travel.destinations.${index}.name`] = 'Ingresá el destino';
      if (!isValidDate(destination.from)) errors[`travel.destinations.${index}.from`] = 'Ingresá fecha de ida';
      if (!isValidDate(destination.to)) {
        errors[`travel.destinations.${index}.to`] = 'Ingresá fecha de regreso';
      } else if (destination.from && new Date(destination.to) < new Date(destination.from)) {
        errors[`travel.destinations.${index}.to`] = 'El regreso debe ser posterior a la ida';
      }
    });

    section.travelers.forEach((traveler, index) => {
      const age = Number(traveler.age);
      if (!traveler.age) {
        errors[`travel.travelers.${index}.age`] = 'Edad requerida';
      } else if (!Number.isInteger(age) || age < 0 || age > 100) {
        errors[`travel.travelers.${index}.age`] = 'Edad válida: 0 a 100';
      }
    });
  }

  return errors;
};

export default function QuotationForm({onClose}){
  const { config } = useAppConfig();
  const quotationConfig = config.quotation;

  useEffect(()=>{
    emailjs.init(quotationConfig.emailjs.publicKey);
  },[quotationConfig.emailjs.publicKey]);

  useEffect(()=>{
    document.body.style.overflow='hidden';
    return ()=> document.body.style.overflow='auto';
  },[]);

  const [form,setForm]=useState({
    insuranceType:'vehicles',
    common:{ fullName:'', email:'', phone:'', ci:'', birthDate: '' },
    vehicles:{ brand:'', model:'', year:'', zone:'', coverage:'', location:'' },
    home:{ type:'', use:'', construction:'', area:'', security:'', coverage:'', location:'' },
    commerce:{ type:'', area:'', security:'', coverage:'', location:'' },
    life:{ smoker:'', health:'', income:'', coverage:'' },
    travel:{
      destinations: [{ name: '', from: '', to: '' }],
      travelers: [{ age: '' }]
    }
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e, index = null, field = null, section = null) => {
    const { name, value } = e.target;
    setForm(prev => {
      if (index !== null) {
        const newList = prev.travel[section].map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        );
        return {
          ...prev,
          travel: { ...prev.travel, [section]: newList }
        };
      }
      if (name in prev.common) {
        return {
          ...prev,
          common: { ...prev.common, [name]: value }
        };
      }
      return {
        ...prev,
        [prev.insuranceType]: { ...prev[prev.insuranceType], [name]: value }
      };
    });
    if (Object.keys(errors).length > 0) {
      setErrors(prev => {
        const next = { ...prev };
        if (index !== null) {
          delete next[`travel.${section}.${index}.${field}`];
        } else if (name in form.common) {
          delete next[`common.${name}`];
        } else {
          delete next[`${form.insuranceType}.${name}`];
        }
        return next;
      });
    }
  };

  const handleBlur = () => {
    if (Object.keys(errors).length > 0) {
      setErrors(buildValidationErrors(form));
    }
  };

  const handleInsuranceTypeChange = insuranceType => {
    setErrors({});
    setForm(prev => ({...prev, insuranceType}));
  };

  const addItem = (section, template) => {
    setErrors({});
    setForm(prev => ({
      ...prev,
      travel: { ...prev.travel, [section]: [...prev.travel[section], template] }
    }));
  };

  const handleSubmit=async()=>{
    const validationErrors = buildValidationErrors(form);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return alert('Revisá los datos marcados antes de enviar');
    }
    try{
      await emailjs.send(quotationConfig.emailjs.serviceId, quotationConfig.emailjs.templateId, {
        from_name: form.common.fullName,
        from_email: form.common.email,
        message: JSON.stringify(form, null, 2)
      });
      alert('Solicitud enviada!');
      onClose && onClose();
    }catch{
      alert('Error al enviar');
    }
  };

  const d = form[form.insuranceType];
  const fieldError = key => errors[key];

  return(
    <Overlay onClick={onClose}>
      <Container onClick={e=>e.stopPropagation()}>
        <Content>
          <h2>Cotización</h2>

          <Tabs>
            {quotationConfig.tabs.map(t=>(
              <Tab key={t.value} $active={form.insuranceType===t.value} onClick={()=>handleInsuranceTypeChange(t.value)}>
                <img src={getAssetUrl(t.image)} alt={t.label}/>
                <span>{t.label}</span>
              </Tab>
            ))}
          </Tabs>

          {/* VEHICULOS */}
          {form.insuranceType==='vehicles' && (
            <Grid>
              <Field>
                <Input name="brand" placeholder="Marca" value={d.brand} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('vehicles.brand')}/>
                {fieldError('vehicles.brand') && <ErrorText>{fieldError('vehicles.brand')}</ErrorText>}
              </Field>
              <Field>
                <Input name="model" placeholder="Modelo" value={d.model} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('vehicles.model')}/>
                {fieldError('vehicles.model') && <ErrorText>{fieldError('vehicles.model')}</ErrorText>}
              </Field>
              <Field>
                <Input name="year" placeholder="Año" type="number" min="1950" max={currentYear + 1} value={d.year} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('vehicles.year')}/>
                {fieldError('vehicles.year') && <ErrorText>{fieldError('vehicles.year')}</ErrorText>}
              </Field>
              <Field>
                <Select name="zone" value={d.zone} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('vehicles.zone')}>
                  <option value="">Departamento</option>
                  {quotationConfig.departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                </Select>
                {fieldError('vehicles.zone') && <ErrorText>{fieldError('vehicles.zone')}</ErrorText>}
              </Field>
              <Field $full>
                <Select name="coverage" value={d.coverage} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('vehicles.coverage')}>
                  <option value="">Cobertura</option>
                  {quotationConfig.vehicleCoverages.map(option => <option key={option}>{option}</option>)}
                </Select>
                {fieldError('vehicles.coverage') && <ErrorText>{fieldError('vehicles.coverage')}</ErrorText>}
              </Field>
            </Grid>
          )}

          {/* HOGAR */}
          {form.insuranceType==='home' && (
            <Grid>
              <Field>
                <Select name="type" value={d.type} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('home.type')}>
                  <option value="">Tipo de Vivienda</option>
                  {quotationConfig.homeTypes.map(option => <option key={option}>{option}</option>)}
                </Select>
                {fieldError('home.type') && <ErrorText>{fieldError('home.type')}</ErrorText>}
              </Field>
              <Field>
                <Select name="use" value={d.use} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('home.use')}>
                  <option value="">Uso</option>
                  {quotationConfig.homeUses.map(option => <option key={option}>{option}</option>)}
                </Select>
                {fieldError('home.use') && <ErrorText>{fieldError('home.use')}</ErrorText>}
              </Field>
              <Field>
                <Input name="area" placeholder="Metros cuadrados (m²)" type="number" min="1" value={d.area} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('home.area')}/>
                {fieldError('home.area') && <ErrorText>{fieldError('home.area')}</ErrorText>}
              </Field>
              <Field>
                <Input name="location" placeholder="Localidad / Barrio" value={d.location} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('home.location')}/>
                {fieldError('home.location') && <ErrorText>{fieldError('home.location')}</ErrorText>}
              </Field>
              <Field>
                <Select name="construction" value={d.construction} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('home.construction')}>
                  <option value="">Construcción</option>
                  {quotationConfig.homeConstructionTypes.map(option => <option key={option}>{option}</option>)}
                </Select>
                {fieldError('home.construction') && <ErrorText>{fieldError('home.construction')}</ErrorText>}
              </Field>
              <Field>
                <Select name="coverage" value={d.coverage} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('home.coverage')}>
                  <option value="">Cobertura deseada</option>
                  {quotationConfig.homeCoverages.map(option => <option key={option}>{option}</option>)}
                </Select>
                {fieldError('home.coverage') && <ErrorText>{fieldError('home.coverage')}</ErrorText>}
              </Field>
            </Grid>
          )}

          {/* COMERCIO */}
          {form.insuranceType==='commerce' && (
            <Grid>
              <Field $full>
                <Input name="type" placeholder="Rubro del comercio" value={d.type} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('commerce.type')}/>
                {fieldError('commerce.type') && <ErrorText>{fieldError('commerce.type')}</ErrorText>}
              </Field>
              <Field>
                <Input name="area" placeholder="m² local" type="number" min="1" value={d.area} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('commerce.area')}/>
                {fieldError('commerce.area') && <ErrorText>{fieldError('commerce.area')}</ErrorText>}
              </Field>
              <Field>
                <Input name="location" placeholder="Ubicación" value={d.location} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('commerce.location')}/>
                {fieldError('commerce.location') && <ErrorText>{fieldError('commerce.location')}</ErrorText>}
              </Field>
              <Field $full>
                <Select name="security" value={d.security} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('commerce.security')}>
                  <option value="">Medidas de Seguridad</option>
                  {quotationConfig.commerceSecurityOptions.map(option => <option key={option}>{option}</option>)}
                </Select>
                {fieldError('commerce.security') && <ErrorText>{fieldError('commerce.security')}</ErrorText>}
              </Field>
            </Grid>
          )}

          {/* VIDA */}
          {form.insuranceType==='life' && (
            <Grid>
              <Field>
                <Select name="smoker" value={d.smoker} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('life.smoker')}>
                  <option value="">¿Fumador?</option>
                  <option>No</option>
                  <option>Sí</option>
                </Select>
                {fieldError('life.smoker') && <ErrorText>{fieldError('life.smoker')}</ErrorText>}
              </Field>
              <Field>
                <Input name="income" placeholder="Ingreso mensual estimado" type="number" min="1" value={d.income} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('life.income')}/>
                {fieldError('life.income') && <ErrorText>{fieldError('life.income')}</ErrorText>}
              </Field>
              <Field $full>
                <Input name="health" placeholder="Enfermedades preexistentes (si tiene)" value={d.health} onChange={handleChange}/>
              </Field>
              <Field $full>
                <Select name="coverage" value={d.coverage} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('life.coverage')}>
                  <option value="">Capital a asegurar</option>
                  {quotationConfig.lifeCoverageOptions.map(option => <option key={option}>{option}</option>)}
                </Select>
                {fieldError('life.coverage') && <ErrorText>{fieldError('life.coverage')}</ErrorText>}
              </Field>
            </Grid>
          )}

          {/* VIAJE */}
          {form.insuranceType==='travel' && (
            <>
              <p><strong>Destinos y Fechas</strong></p>
              {d.destinations.map((dest, idx) => (
                <DynamicItem key={idx}>
                  <Grid>
                    <Field>
                      <Input placeholder="Destino" value={dest.name} onChange={e => handleChange(e, idx, 'name', 'destinations')} onBlur={handleBlur} $invalid={fieldError(`travel.destinations.${idx}.name`)} />
                      {fieldError(`travel.destinations.${idx}.name`) && <ErrorText>{fieldError(`travel.destinations.${idx}.name`)}</ErrorText>}
                    </Field>
                    <div style={{display:'flex', gap:'5px'}}>
                      <Field>
                        <Input type="date" value={dest.from} onChange={e => handleChange(e, idx, 'from', 'destinations')} onBlur={handleBlur} $invalid={fieldError(`travel.destinations.${idx}.from`)} />
                        {fieldError(`travel.destinations.${idx}.from`) && <ErrorText>{fieldError(`travel.destinations.${idx}.from`)}</ErrorText>}
                      </Field>
                      <Field>
                        <Input type="date" value={dest.to} onChange={e => handleChange(e, idx, 'to', 'destinations')} onBlur={handleBlur} $invalid={fieldError(`travel.destinations.${idx}.to`)} />
                        {fieldError(`travel.destinations.${idx}.to`) && <ErrorText>{fieldError(`travel.destinations.${idx}.to`)}</ErrorText>}
                      </Field>
                    </div>
                  </Grid>
                </DynamicItem>
              ))}
              <button onClick={()=>addItem('destinations', {name:'', from:'', to:''})} style={{background:'none', border:'none', color:'#064e3b', cursor:'pointer', fontWeight:600, marginBottom:20}}>+ Agregar otro destino</button>

              <p><strong>Viajeros (Edades)</strong></p>
              <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
                {d.travelers.map((t, idx) => (
                  <Field key={idx} style={{width: 110}}>
                    <Input style={{width: 80}} type="number" min="0" max="100" placeholder="Edad" value={t.age} onChange={e => handleChange(e, idx, 'age', 'travelers')} onBlur={handleBlur} $invalid={fieldError(`travel.travelers.${idx}.age`)} />
                    {fieldError(`travel.travelers.${idx}.age`) && <ErrorText>{fieldError(`travel.travelers.${idx}.age`)}</ErrorText>}
                  </Field>
                ))}
                <button onClick={()=>addItem('travelers', {age:''})} style={{width:40, height:40, borderRadius:8, border:'1px dashed #ccc', cursor:'pointer'}}>+</button>
              </div>
            </>
          )}

          {/* DATOS PERSONALES */}
          <div style={{marginTop:30, borderTop:'1px solid #eee', paddingTop:20}}>
            <Grid>
              <Field $full>
                <Input name="fullName" placeholder="Nombre completo" value={form.common.fullName} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('common.fullName')}/>
                {fieldError('common.fullName') && <ErrorText>{fieldError('common.fullName')}</ErrorText>}
              </Field>
              <Field>
                <Input name="email" placeholder="Email" type="email" value={form.common.email} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('common.email')}/>
                {fieldError('common.email') && <ErrorText>{fieldError('common.email')}</ErrorText>}
              </Field>
              <Field>
                <Input name="phone" placeholder="Celular" type="tel" value={form.common.phone} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('common.phone')}/>
                {fieldError('common.phone') && <ErrorText>{fieldError('common.phone')}</ErrorText>}
              </Field>
              <InputGroup>
                <label>Fecha de Nacimiento</label>
                <Input name="birthDate" type="date" value={form.common.birthDate} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('common.birthDate')}/>
                {fieldError('common.birthDate') && <ErrorText>{fieldError('common.birthDate')}</ErrorText>}
              </InputGroup>
              <Field $full>
                <Input name="ci" placeholder="Cédula de Identidad" value={form.common.ci} onChange={handleChange} onBlur={handleBlur} $invalid={fieldError('common.ci')}/>
                {fieldError('common.ci') && <ErrorText>{fieldError('common.ci')}</ErrorText>}
              </Field>
            </Grid>
          </div>

        </Content>

        <Footer>
          <Button onClick={handleSubmit}>
            Enviar solicitud
          </Button>
        </Footer>
      </Container>
    </Overlay>
  );
}
