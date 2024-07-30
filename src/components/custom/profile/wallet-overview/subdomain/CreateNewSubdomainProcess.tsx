import React, { useEffect, useState } from 'react';
import SubdomainAdvantagesDialog from './SubdomainAdvantagesDialog';
import CreateNewSubnameDialog from './CreateNewSubnameDialog';
import { useProfileStore } from '@/store/profile';
import ConfirmSubnameDialog from './ConfirmSubnameDialog';
import TransactionSubnameDialog from './TransactionSubnameDialog';
import ToastLookCard from '@/components/custom/shared/ToastLookCard';
import { toast } from 'sonner';

interface IProp {
  startCreateSubdomainProcess: boolean;
  setStartCreateSubdomainProcess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewSubdomainProcess = ({ setStartCreateSubdomainProcess, startCreateSubdomainProcess }: IProp) => {


  const [openAdvantagesDialog, setOpenAdvantagesDialog] = useState(false);
  const [openEnterNameDialog, setOpenEnterNameDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openTransactionDataDialog, setOpenTransactionDataDialog] = useState(false);

  const { currentStep, navigateCreateSubdomainStep } = useProfileStore(state => state.overviewTab.subdomain.createNewSubdomain);

  const handleNavigationOfSteps = (navigationMode: "NEXT" | "PREVIOUS") => {
    switch (currentStep) {
      case 'advantages':
        navigateCreateSubdomainStep(navigationMode);
        break;
      case 'enter-name':
        navigateCreateSubdomainStep(navigationMode);
        break;
      case 'confirmation':
        navigateCreateSubdomainStep(navigationMode);
        break;
      case 'transaction':
        setOpenTransactionDataDialog(false);
        toast.custom(
          (id) => (
            <ToastLookCard
              variant="success"
              title="Subname created successfully"
              description={"You have successfully created you subname."}
              onClose={() => toast.dismiss(id)}
            />
          ),
          {
            duration: 3000,
            className: 'w-full !bg-transparent',
            position: "bottom-left",
          }
        );

        break;
      default:
        navigateCreateSubdomainStep(navigationMode);
        break;
    }
  };

  const handleOpenCurrentStep = () => {
    switch (currentStep) {
      case 'advantages':
        setOpenAdvantagesDialog(true);
        setOpenEnterNameDialog(false);
        setOpenConfirmationDialog(false);
        setOpenTransactionDataDialog(false);
        break;
      case 'enter-name':
        setOpenAdvantagesDialog(false);
        setOpenEnterNameDialog(true);
        setOpenConfirmationDialog(false);
        setOpenTransactionDataDialog(false);
        break;
      case 'confirmation':
        setOpenAdvantagesDialog(false);
        setOpenEnterNameDialog(false);
        setOpenConfirmationDialog(true);
        setOpenTransactionDataDialog(false);
        break;
      case 'transaction':
        setOpenAdvantagesDialog(false);
        setOpenEnterNameDialog(false);
        setOpenConfirmationDialog(false);
        setOpenTransactionDataDialog(true);
        break;
    }
  };

  useEffect(() => {
    if (currentStep && startCreateSubdomainProcess) {
      handleOpenCurrentStep();
    }

    if (!currentStep && startCreateSubdomainProcess) {
      handleNavigationOfSteps('NEXT');
    }
  }, [currentStep, startCreateSubdomainProcess]);

  useEffect(() => {
    if (!openAdvantagesDialog && !openEnterNameDialog && !openConfirmationDialog && !openTransactionDataDialog) {
      setStartCreateSubdomainProcess(false);
    }

  }, [openAdvantagesDialog, openEnterNameDialog, openConfirmationDialog, openTransactionDataDialog]);

  return (
    <>
      <SubdomainAdvantagesDialog
        open={openAdvantagesDialog && currentStep === 'advantages'}
        setOpen={setOpenAdvantagesDialog}
        handleNavigationOfSteps={handleNavigationOfSteps}
      />

      <CreateNewSubnameDialog
        open={openEnterNameDialog && currentStep === "enter-name"}
        setOpen={setOpenEnterNameDialog}
        handleNavigationOfSteps={handleNavigationOfSteps}
      />

      <ConfirmSubnameDialog
        open={openConfirmationDialog && currentStep === "confirmation"}
        setOpen={setOpenConfirmationDialog}
        handleNavigationOfSteps={handleNavigationOfSteps}
      />

      <TransactionSubnameDialog
        open={openTransactionDataDialog && currentStep === "transaction"}
        setOpen={setOpenTransactionDataDialog}
        handleNavigationOfSteps={handleNavigationOfSteps}
      />
    </>
  );
};

export default CreateNewSubdomainProcess;