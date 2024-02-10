import { Routing } from "@pages/index";
import { withProviders } from "./providers";
import { legalAPI } from "@shared/store/services/legalService";

const App: React.FC = () => {
  const [createLegal] = legalAPI.useCreateLegalMutation();
  const handleClick = () => {
    const data = {
      type_legal: 1,
      name: "string",
      address: "string",
      INN: 0,
      checking_account: "string",
      bank_name: "string",
      bank_mfo: 0,
      phone: "string",
      email: "string",
      PNFL: 0,
      registration_number: 0,
      registration_date: "23.02.2024",
      transit_account: "string",
      card_number: 0,
      card_date_year: 0,
      card_date_month: 0,
    };
    createLegal(data);
  };
  return (
    <>
      <Routing />
      <button onClick={handleClick}>AuthReq</button>
    </>
  );
};

export default withProviders(App);
