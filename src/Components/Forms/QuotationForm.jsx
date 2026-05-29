import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styled, { keyframes } from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import { APP_CONFIG } from '../../config/appConfig';
import { useSiteContent } from '../../Hooks/useSiteContent';
import SmartImage from '../Common/SmartImage';

emailjs.init(APP_CONFIG.integrations.emailjs.publicKey);

/* ===== ANIMACIÓN ===== */
const fadeIn = keyframes`
  from { opacity:0; transform:translateY(10px);}
  to { opacity:1; transform:translateY(0);}
`;

/* ===== LAYOUT ===== */
const Overlay = styled.div`
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:1000;
  padding:20px; `;

const Container = styled.div`
  width:100%;
  max-width:760px;
  background:${props => props.$colors.wrapper};
  border-radius:22px;
  display:flex;
  flex-direction:column;
  max-height:92vh;
  overflow:hidden;
  animation:${fadeIn} .3s ease;
  position:relative;
`;

const CloseButton = styled.button`
  position:absolute;
  top:10px;
  right:10px;
  width:40px;
  height:40px;
  border:none;
  border-radius:999px;
  background:#ffffff;
  color:#1f2937;
  font-size:28px;
  line-height:1;
  cursor:pointer;
  z-index:2;
  box-shadow:0 4px 14px rgba(15,23,42,0.16);

  @media(max-width:600px){
    top:8px;
    right:8px;
    width:42px;
    height:42px;
  }
`;

const Content = styled.div`
  padding:28px;
  overflow-y:auto;
  flex:1;

  @media(max-width:600px){
    padding:22px 18px;
  }
`;

const Footer = styled.div`
  position:sticky;
  bottom:0;
  background:white;
  padding:15px;
  border-top:1px solid #eee;
`;

/* ===== UI ===== */
const Tabs = styled.div`
  display:flex;
  justify-content:center;
  gap:10px;
  overflow-x:auto;
  width:100%;
  padding:4px 2px 12px;
  margin:0 auto 22px;
  scrollbar-width:none;
  &::-webkit-scrollbar { display:none; }

  @media(max-width:620px){
    justify-content:flex-start;
    padding-inline:2px;
  }
`;

const Tab = styled.button`
  flex:0 0 92px;
  border-radius:12px;
  border:2px solid ${p=>p.$active?'#064e3b':'transparent'};
  background:${p=>p.$active?'#ecfdf5':'#fff'};
  padding:8px 6px;
  cursor:pointer;
  display:flex;
  flex-direction:column;
  align-items:center;
  box-shadow:${p=>p.$active?'0 8px 18px rgba(6,78,59,0.12)':'0 1px 8px rgba(15,23,42,0.06)'};
  transition:transform .18s ease, border-color .18s ease, box-shadow .18s ease;

  &:hover{
    transform:translateY(-2px);
  }

  span{
    width:60px;
    height:60px;
    border-radius:10px;
    opacity:${p=>p.$active?1:0.6};
  }

  span{
    font-size:12px;
    margin-top:4px;
    line-height:1.2;
    text-align:center;
  }
`;

const Title = styled.h2`
  margin:0 0 18px;
  color:${props => props.$colors.title};
  font-size:clamp(1.55rem, 2.4vw, 2rem);
  text-align:center;
`;

const Grid = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;

  @media(max-width:600px){
    grid-template-columns:1fr;
  }
`;

const Input = styled.input`
  padding:12px;
  border-radius:8px;
  border:1px solid #ccc;
`;

const Select = styled.select`
  padding:12px;
  border-radius:8px;
  border:1px solid #ccc;
`;

const Button = styled.button`
  width:100%;
  padding:16px;
  border:none;
  border-radius:12px;
  background:${p=>p.disabled?'#ccc':p.$colors.buttonBackground};
  color:${p=>p.$colors.buttonText};
  font-weight:600;
`;

const CaptchaWrap = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;

  @media(max-width:420px){
    transform: scale(0.86);
    transform-origin: center;
  }
`;

const FormMessage = styled.p`
  margin: 12px 0 0;
  color: ${p => (p.$error ? '#b91c1c' : '#047857')};
  font-weight: 700;
  text-align: center;
`;

const SuccessPanel = styled.div`
  margin: 16px 0 0;
  padding: 14px 16px;
  border-radius: 12px;
  background: #ecfdf5;
  color: #047857;
  font-weight: 800;
  text-align: center;
  border: 1px solid #a7f3d0;
`;

const PersonalData = styled.div`
  display:grid;
  gap:10px;
  margin-top:20px;
`;

const URUGUAY_LOCALITIES = [
  'Montevideo',
  'Ciudad de la Costa',
  'Las Piedras',
  'Pando',
  'Canelones',
  'Santa Lucía',
  'Progreso',
  'Maldonado',
  'Punta del Este',
  'San Carlos',
  'Piriápolis',
  'Salto',
  'Paysandú',
  'Rivera',
  'Tacuarembó',
  'Melo',
  'Artigas',
  'Bella Unión',
  'Mercedes',
  'Dolores',
  'Fray Bentos',
  'Young',
  'Colonia del Sacramento',
  'Carmelo',
  'Nueva Helvecia',
  'Rosario',
  'San José de Mayo',
  'Libertad',
  'Florida',
  'Durazno',
  'Trinidad',
  'Minas',
  'Rocha',
  'Chuy',
  'Treinta y Tres',
];

const INSURANCE_LABELS = {
  vehicles: 'Vehículo',
  home: 'Hogar',
  commerce: 'Comercio',
  life: 'Vida',
  travel: 'Viaje',
};

const FIELD_LABELS = {
  fullName: 'Nombre completo',
  email: 'Email',
  phone: 'Teléfono',
  ci: 'Cédula',
  birthDate: 'Fecha de nacimiento',
  brand: 'Marca',
  model: 'Modelo',
  year: 'Año',
  zone: 'Zona de circulación',
  coverage: 'Cobertura',
  location: 'Localidad',
  type: 'Tipo/Rubro',
  use: 'Uso',
  construction: 'Construcción',
  area: 'Área',
  security: 'Seguridad',
  employees: 'Empleados',
  smoker: 'Fumador',
  health: 'Salud / antecedentes',
  income: 'Ingreso mensual',
  destinations: 'Destino(s)',
  startDate: 'Fecha de salida',
  endDate: 'Fecha de regreso',
  travelers: 'Cantidad de viajeros',
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const digitsOnly = (value) => String(value || '').replace(/\D/g, '');

const formatDate = (value) => {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return year && month && day ? `${day}/${month}/${year}` : value;
};

const formatValue = (key, value) => {
  if (!value) return '';
  if (key === 'birthDate' || key === 'startDate' || key === 'endDate') return formatDate(value);
  return value;
};

const buildQuoteMessage = (data) => {
  const typeLabel = INSURANCE_LABELS[data.insuranceType] || data.insuranceType;
  const orderedKeys = [
    'fullName',
    'email',
    'phone',
    'ci',
    'birthDate',
    'brand',
    'model',
    'year',
    'zone',
    'coverage',
    'location',
    'type',
    'use',
    'construction',
    'area',
    'security',
    'employees',
    'smoker',
    'health',
    'income',
    'destinations',
    'startDate',
    'endDate',
    'travelers',
  ];

  const detailLines = orderedKeys
    .filter((key) => data[key])
    .map((key) => `${FIELD_LABELS[key] || key}: ${formatValue(key, data[key])}`);

  return [
    `Nueva solicitud de cotización - ${typeLabel}`,
    '',
    'Datos del cliente:',
    `Nombre: ${data.fullName}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.phone}`,
    data.ci ? `Cédula: ${data.ci}` : '',
    data.birthDate ? `Fecha de nacimiento: ${formatDate(data.birthDate)}` : '',
    '',
    'Detalle de la solicitud:',
    `Seguro solicitado: ${typeLabel}`,
    ...detailLines.filter((line) => !line.startsWith('Nombre completo:') && !line.startsWith('Email:') && !line.startsWith('Teléfono:') && !line.startsWith('Cédula:') && !line.startsWith('Fecha de nacimiento:')),
    '',
    'Por favor, contactar al cliente a la brevedad para continuar con la cotización.',
  ].filter(Boolean).join('\n');
};

/* ===== COMPONENT ===== */
export default function QuotationForm({onClose}){
  const { content } = useSiteContent();
  const colors = content.styles?.forms || {};

  useEffect(()=>{
    document.body.style.overflow='hidden';
    return ()=> document.body.style.overflow='auto';
  },[]);

  const types=[
    {value:'vehicles', label:'Vehículos', img:process.env.PUBLIC_URL + '/Images/Logos/vehiculo.jpg'},
    {value:'home', label:'Hogar', img:process.env.PUBLIC_URL + '/Images/Logos/hogar.jpg'},
    {value:'commerce', label:'Comercio', img:process.env.PUBLIC_URL + '/Images/Logos/Empresa.jpg'},
    {value:'life', label:'Vida', img:process.env.PUBLIC_URL + '/Images/Logos/vida.jpg'},
    {value:'travel', label:'Viaje', img:process.env.PUBLIC_URL + '/Images/Logos/viaje.jpg'},
  ];

  const [form,setForm]=useState({
    insuranceType:'vehicles',

    vehicles:{
      brand:'', model:'', year:'',
      zone:'', coverage:'', location:''
    },

    home:{
      type:'', use:'', construction:'',
      area:'', security:'', coverage:'', location:''
    },

    commerce:{
      type:'', employees:'', area:'',
      security:'', coverage:'', location:''
    },

    life:{
      age:'', smoker:'', health:'',
      income:'', coverage:''
    },

    travel:{
      destinations:'', startDate:'',
      endDate:'', travelers:''
    },

    common:{
      fullName:'', email:'', phone:'', ci:'', birthDate:''
    }
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const changeType=(type)=>{
    setForm(prev=>({...prev,insuranceType:type}));
  };

  const handleChange=(e)=>{
    const {name,value}=e.target;

    if(name in form.common){
      setForm(prev=>({...prev,common:{...prev.common,[name]:value}}));
    } else {
      setForm(prev=>({
        ...prev,
        [prev.insuranceType]:{
          ...prev[prev.insuranceType],
          [name]:value
        }
      }));
    }
  };

  const isValid=()=>{
    const t=form.insuranceType;
    const d=form[t];
    const c=form.common;

    if(!c.fullName || !c.email || !c.phone || !c.birthDate) return false;
    if(!validateEmail(c.email)) return false;
    if(digitsOnly(c.phone).length < 8) return false;
    if(c.ci && digitsOnly(c.ci).length < 7) return false;

    if(t==='vehicles') return d.brand && d.year && d.coverage && d.location;
    if(t==='home') return d.type && d.area && d.coverage && d.location;
    if(t==='commerce') return d.type && d.area && d.location;
    if(t==='life') return d.age && d.coverage;
    if(t==='travel') return d.destinations && d.startDate && d.endDate && d.travelers;

    return true;
  };

  const validateBeforeSubmit=()=>{
    const t=form.insuranceType;
    const d=form[t];
    const c=form.common;

    if(!c.fullName.trim()) return 'Ingresá el nombre completo.';
    if(!validateEmail(c.email)) return 'Ingresá un email válido.';
    if(digitsOnly(c.phone).length < 8) return 'Ingresá un teléfono válido.';
    if(c.ci && digitsOnly(c.ci).length < 7) return 'Ingresá una cédula válida.';
    if(!c.birthDate) return 'Seleccioná la fecha de nacimiento.';

    if(t==='vehicles' && (!d.brand || !d.year || !d.coverage || !d.location)) {
      return 'Completá marca, año, cobertura y localidad del vehículo.';
    }
    if(t==='home' && (!d.type || !d.area || !d.coverage || !d.location)) {
      return 'Completá tipo, área, cobertura y localidad del hogar.';
    }
    if(t==='commerce' && (!d.type || !d.area || !d.location)) {
      return 'Completá rubro, área y localidad del comercio.';
    }
    if(t==='life' && (!d.age || !d.coverage)) {
      return 'Completá edad y cobertura solicitada.';
    }
    if(t==='travel' && (!d.destinations || !d.startDate || !d.endDate || !d.travelers)) {
      return 'Completá destino, fechas y cantidad de viajeros.';
    }

    return '';
  };

  const handleSubmit=async()=>{
    if(loading) return;

    const validationError = validateBeforeSubmit();
    if(validationError){
      setSubmitMessage(validationError);
      return;
    }

    if(!captchaValue){
      setSubmitMessage(APP_CONFIG.errors.quoteCaptcha);
      return;
    }

    const data={
      ...form.common,
      ...form[form.insuranceType],
      insuranceType:form.insuranceType
    };

    try{
      setLoading(true);
      setSubmitMessage('');

      await emailjs.send(APP_CONFIG.integrations.emailjs.serviceId, APP_CONFIG.integrations.emailjs.quoteTemplateId, {
        to_email: APP_CONFIG.integrations.emailjs.toEmail,
        reply_to: data.email,
        sender_email: APP_CONFIG.integrations.emailjs.fromEmail,
        sender_name: APP_CONFIG.integrations.emailjs.fromName,
        from_name:data.fullName,
        from_email:data.email,
        phone:data.phone,
        birth_date:formatDate(data.birthDate),
        insurance_type:INSURANCE_LABELS[data.insuranceType] || data.insuranceType,
        'g-recaptcha-response': captchaValue,
        message:buildQuoteMessage(data)
      });

      setSubmitMessage(APP_CONFIG.errors.quoteSuccess);
      onClose && onClose();

    }catch(error){
      const detail = error?.text || error?.message || '';
      console.error('EmailJS quote send failed:', error);
      setSubmitMessage(detail ? `${APP_CONFIG.errors.quoteSendFailed} ${detail}` : APP_CONFIG.errors.quoteSendFailed);
    }finally{
      setLoading(false);
    }
  };

  const d=form[form.insuranceType];
  const c=form.common;

  return(
    <Overlay onClick={onClose}>
      <Container $colors={colors} onClick={e=>e.stopPropagation()}>
        <CloseButton type="button" onClick={onClose} aria-label="Cerrar formulario">
          &times;
        </CloseButton>

        <Content>

          <Title $colors={colors}>Cotización</Title>

          <Tabs>
            {types.map(t=>(
              <Tab key={t.value}
                $active={form.insuranceType===t.value}
                onClick={()=>changeType(t.value)}
              >
                <SmartImage src={t.img} alt={t.label}/>
                <span>{t.label}</span>
              </Tab>
            ))}
          </Tabs>

          {/* VEHICULOS */}
          {form.insuranceType==='vehicles' && (
            <Grid>
              <Input name="brand" value={d.brand} placeholder="Marca" onChange={handleChange}/>
              <Input name="model" value={d.model} placeholder="Modelo" onChange={handleChange}/>
              <Input name="year" value={d.year} placeholder="Año" onChange={handleChange}/>

              <Select name="zone" value={d.zone} onChange={handleChange}>
                <option value="">Zona circulación</option>
                <option>Montevideo</option>
                <option>Interior</option>
                <option>Mixto</option>
              </Select>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>Responsabilidad Civil</option>
                <option>Terceros</option>
                <option>Terceros Completo</option>
                <option>Todo Riesgo</option>
              </Select>

              <Select name="location" value={d.location} onChange={handleChange}>
                <option value="">Localidad</option>
                {URUGUAY_LOCALITIES.map(locality => <option key={locality}>{locality}</option>)}
              </Select>
            </Grid>
          )}

          {/* HOGAR */}
          {form.insuranceType==='home' && (
            <Grid>
              <Select name="type" value={d.type} onChange={handleChange}>
                <option value="">Tipo</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </Select>

              <Select name="construction" value={d.construction} onChange={handleChange}>
                <option value="">Construcción</option>
                <option>Tradicional</option>
                <option>Liviana</option>
              </Select>

              <Input name="area" value={d.area} placeholder="m²" onChange={handleChange}/>
              <Input name="security" value={d.security} placeholder="Seguridad" onChange={handleChange}/>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>Incendio</option>
                <option>Incendio + Hurto</option>
                <option>Todo Riesgo Hogar</option>
              </Select>

              <Select name="location" value={d.location} onChange={handleChange}>
                <option value="">Localidad</option>
                {URUGUAY_LOCALITIES.map(locality => <option key={locality}>{locality}</option>)}
              </Select>
            </Grid>
          )}

          {/* COMERCIO */}
          {form.insuranceType==='commerce' && (
            <Grid>
              <Input name="type" value={d.type} placeholder="Rubro" onChange={handleChange}/>
              <Input name="employees" value={d.employees} placeholder="Empleados" onChange={handleChange}/>
              <Input name="area" value={d.area} placeholder="m²" onChange={handleChange}/>
              <Input name="security" value={d.security} placeholder="Seguridad" onChange={handleChange}/>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>Básica</option>
                <option>Intermedia</option>
                <option>Completa</option>
              </Select>

              <Select name="location" value={d.location} onChange={handleChange}>
                <option value="">Localidad</option>
                {URUGUAY_LOCALITIES.map(locality => <option key={locality}>{locality}</option>)}
              </Select>
            </Grid>
          )}

          {/* VIDA */}
          {form.insuranceType==='life' && (
            <Grid>
              <Input name="age" value={d.age} placeholder="Edad" onChange={handleChange}/>

              <Select name="smoker" value={d.smoker} onChange={handleChange}>
                <option value="">Fumador</option>
                <option>No</option>
                <option>Sí</option>
              </Select>

              <Input name="health" value={d.health} placeholder="Salud / enfermedades" onChange={handleChange}/>
              <Input name="income" value={d.income} placeholder="Ingreso mensual" onChange={handleChange}/>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>USD 50.000</option>
                <option>USD 100.000</option>
                <option>USD 200.000</option>
              </Select>
            </Grid>
          )}

          {/* VIAJE */}
          {form.insuranceType==='travel' && (
            <Grid>
              <Input name="destinations" value={d.destinations} placeholder="Destino(s)" onChange={handleChange}/>
              <Input type="date" name="startDate" value={d.startDate} onChange={handleChange}/>
              <Input type="date" name="endDate" value={d.endDate} onChange={handleChange}/>
              <Input name="travelers" value={d.travelers} placeholder="Cantidad viajeros" onChange={handleChange}/>
            </Grid>
          )}

          {/* DATOS PERSONALES */}
          <PersonalData>
            <Input name="fullName" value={c.fullName} placeholder="Nombre completo" onChange={handleChange}/>
            <Grid>
              <Input type="email" name="email" value={c.email} placeholder="Email" onChange={handleChange}/>
              <Input type="tel" name="phone" value={c.phone} placeholder="Celular" onChange={handleChange}/>
              <Input name="ci" value={c.ci} placeholder="Cédula" onChange={handleChange}/>
              <Input type="date" name="birthDate" value={c.birthDate} onChange={handleChange} aria-label="Fecha de nacimiento"/>
            </Grid>
          </PersonalData>

          <CaptchaWrap>
            <ReCAPTCHA
              sitekey={APP_CONFIG.integrations.recaptcha.siteKey}
              onChange={setCaptchaValue}
            />
          </CaptchaWrap>

          {submitMessage && (
            submitMessage === APP_CONFIG.errors.quoteSuccess ? (
              <SuccessPanel>{submitMessage} Te contactaremos a la brevedad.</SuccessPanel>
            ) : (
              <FormMessage $error={submitMessage.includes('Error') || submitMessage.includes('CAPTCHA')}>
                {submitMessage}
              </FormMessage>
            )
          )}

        </Content>

        <Footer>
          <Button $colors={colors} onClick={handleSubmit} disabled={!isValid() || !captchaValue || loading}>
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </Button>
        </Footer>

      </Container>
    </Overlay>
  );
}
