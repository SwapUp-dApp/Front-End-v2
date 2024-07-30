import EmptyDataset from '../../../shared/EmptyDataset';
import LoadingDataset from '../../../shared/LoadingDataset';
import AvoidingFeeDialog from './AvoidingFeeDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const SubDomainMintingSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:items-center lg:justify-between" >
        <div className="flex items-center lg:justify-between gap-4" >
          <h2 className="text-1.5xl font-medium" >Subdomains</h2>
        </div>

        <div className='w-full lg:w-2/5 flex items-center gap-2' >
          <Input
            className="w-full lg:w-[65%] bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
            placeholder="Search by subname"
            icon={
              <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
              </svg>
            }
          />

          <AvoidingFeeDialog className="w-full lg:w-[35%] gradient-button px-5 py-3 flex justify-center" >
            Mint subdomain
          </AvoidingFeeDialog>
        </div>
      </div>

      <EmptyDataset
        title="Subdomain Not Minted"
        description={`Consider obtaining a subdomain to enhance your identity across web3, consolidate all <br/> your crypto addresses under one name.`}
      >
        <AvoidingFeeDialog className="gradient-button px-5 py-3" >
          Mint subdomain
        </AvoidingFeeDialog>
      </EmptyDataset>

      <LoadingDataset
        isLoading={false}
        title="Loading mint subdomain"
        description='Minted subdomains data is being loaded...'
      />
    </div >
  );
};

export default SubDomainMintingSection;