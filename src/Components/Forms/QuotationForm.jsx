import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styled, { keyframes } from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import { APP_CONFIG } from '../../config/appConfig';
import { useSiteContent } from '../../Hooks/useSiteContent';

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

  img{
    width:60px;
    height:60px;
    object-fit:cover;
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

const PersonalData = styled.div`
  display:grid;
  gap:10px;
  margin-top:20px;
`;

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
      fullName:'', email:'', phone:'', ci:''
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

    if(!c.fullName || !c.email || !c.phone) return false;

    if(t==='vehicles') return d.brand && d.year && d.coverage;
    if(t==='home') return d.type && d.area && d.coverage;
    if(t==='commerce') return d.type && d.area;
    if(t==='life') return d.age && d.coverage;
    if(t==='travel') return d.destinations && d.startDate;

    return true;
  };

  const handleSubmit=async()=>{
    if(loading) return;

    if(!isValid()){
      alert(APP_CONFIG.errors.quoteIncomplete);
      return;
    }

    if(!captchaValue){
      setSubmitMessage(APP_CONFIG.errors.quoteCaptcha);
      return;
    }

    const data={
      ...form.common,
      ...form[form.insuranceType],
      type:form.insuranceType
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
        'g-recaptcha-response': captchaValue,
        message:JSON.stringify(data,null,2)
      });

      setSubmitMessage(APP_CONFIG.errors.quoteSuccess);
      onClose && onClose();

    }catch{
      setSubmitMessage(APP_CONFIG.errors.quoteSendFailed);
    }finally{
      setLoading(false);
    }
  };

  const d=form[form.insuranceType];
  const c=form.common;

  return(
    <Overlay onClick={onClose}>
      <Container $colors={colors} onClick={e=>e.stopPropagation()}>

        <Content>

          <Title $colors={colors}>Cotización</Title>

          <Tabs>
            {types.map(t=>(
              <Tab key={t.value}
                $active={form.insuranceType===t.value}
                onClick={()=>changeType(t.value)}
              >
                <img src={t.img} alt={t.label}/>
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

              <Input name="location" value={d.location} placeholder="Localidad" onChange={handleChange}/>
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

              <Input name="location" value={d.location} placeholder="Localidad" onChange={handleChange}/>
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

              <Input name="location" value={d.location} placeholder="Localidad" onChange={handleChange}/>
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
              <Input name="email" value={c.email} placeholder="Email" onChange={handleChange}/>
              <Input name="phone" value={c.phone} placeholder="Celular" onChange={handleChange}/>
              <Input name="ci" value={c.ci} placeholder="Cédula" onChange={handleChange}/>
            </Grid>
          </PersonalData>

          <CaptchaWrap>
            <ReCAPTCHA
              sitekey={APP_CONFIG.integrations.recaptcha.siteKey}
              onChange={setCaptchaValue}
            />
          </CaptchaWrap>

          {submitMessage && (
            <FormMessage $error={submitMessage.includes('Error') || submitMessage.includes('CAPTCHA')}>
              {submitMessage}
            </FormMessage>
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
