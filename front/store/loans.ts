import { defineStore, acceptHMRUpdate } from "pinia";
import { useToastsStore } from "./toasts";

export enum LoanApplicationStatusEnum {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  DISBURSED = "disbursed",
  REPAID = "repaid",
  WITHDRAWN = "withdrawn",
}

export interface NewLoanApplication {
  purpose: string;
  information: string;
  principleAmount: string | undefined;
  interestAmount: string | number | null;
  interestRate: number;
  fees?: number | null;
  status?: LoanApplicationStatus;
  installments: string | undefined;
  repaymentFrequency: string | null;
  repayableAmount: string | number | null;
  installmentAmount: string | number | null;
}

export type LoanApplicationStatus =
  | LoanApplicationStatusEnum.DRAFT
  | LoanApplicationStatusEnum.PENDING
  | LoanApplicationStatusEnum.APPROVED
  | LoanApplicationStatusEnum.REJECTED
  | LoanApplicationStatusEnum.DISBURSED
  | LoanApplicationStatusEnum.REPAID
  | LoanApplicationStatusEnum.WITHDRAWN;

export interface LoanApplication extends NewLoanApplication {
  _id: string;
  status: LoanApplicationStatus;
}

export interface NewLoanApplicationResponse {
  error?: any;
  data?: Object;
}

export interface MyLoanApplicationsResponse {
  error?: any;
  data: LoanApplication[];
}

export interface WithdawLoanApplicationResponse {
  error?: any;
  success: boolean;
}

export interface LoanApplicationsResponse {
  error?: any;
  data?: LoanApplication[];
}

export interface LoanApplicationApprovalResponse {
  error?: any;
  success: boolean;
}

export interface LoanApplicationRejectResponse {
  error?: any;
  success: boolean;
}

export interface LoanDisburseResponse {
  success: boolean;
  error?: any;
}

export const useLoansStore = defineStore(
  "loans",
  () => {
    const { $api } = useNuxtApp();

    const applications = ref<LoanApplication[]>([]);
    const error = ref<any>();
    const loading = ref(false);
    const toasts = useToastsStore();

    const apply = async (payload: NewLoanApplication) => {
      error.value = null;
      loading.value = true;
      try {
        const { error, data }: NewLoanApplicationResponse = await $api.post(
          "/loan-applications",
          payload
        );

        if (error) {
          toasts.addError("Loan application", error);
        }

        if (data) {
          // do something
          toasts.addSuccess(
            "Application submitted!",
            "Loan application has been successfully submitted"
          );
          return true;
        }

        return false;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const getMyLoanApplications = async () => {
      loading.value = true;
      try {
        const { error: err, data }: MyLoanApplicationsResponse = await $api.get(
          "/loan-applications"
        );
        if (err) {
          error.value = err;
        }

        if (data) {
          applications.value = data;
        }
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const withdrawLoanApplication = async (id: string) => {
      loading.value = true;
      try {
        const { error, success }: WithdawLoanApplicationResponse =
          await $api.put(`/loan-applications/${id}/withdraw`);
        if (error || !success) {
          toasts.addError("Loan withdrawal", error ?? "Could not complete");
        } else if (success) {
          const i = applications.value.findIndex((a) => a._id === id);
          if (i !== -1) {
            applications.value[i].status = LoanApplicationStatusEnum.WITHDRAWN;
          }
        }
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const deleteLoanApplication = async (id: string) => {
      loading.value = true;
      try {
        const { error, success }: WithdawLoanApplicationResponse =
          await $api.delete(`/loan-applications/${id}`);
        if (error || !success) {
          toasts.addError("Loan withdrawal", error ?? "Could not complete");
        } else if (success) {
          const i = applications.value.findIndex((a) => a._id === id);
          if (i !== -1) {
            applications.value.splice(i, 1);
          }
        }
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const submitLoanApplication = async (id: string) => {
      loading.value = true;
      try {
        const { error, success }: WithdawLoanApplicationResponse =
          await $api.put(`/loan-applications/${id}/submit`);
        if (error || !success) {
          toasts.addError(
            "Loan Application Submission",
            error ?? "Could not complete"
          );
        } else if (success) {
          const i = applications.value.findIndex((a) => a._id === id);
          if (i !== -1) {
            applications.value[i].status = LoanApplicationStatusEnum.PENDING;
          }
        }
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const getLoanApplications = async () => {
      error.value = null;
      loading.value = true;
      applications.value = []
      try {
        const { data, error: err }: LoanApplicationsResponse = await $api.get(
          "/admin/loan-applications"
        );

        if (err) {
          error.value = err;
          toasts.addError("Getting applications", err);
        }

        if (data) {
          applications.value = data;
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    const approveLoanApplication = async (id: string) => {
      error.value = null;
      loading.value =true;

      try {
        const { error: err, success }: LoanApplicationApprovalResponse =
          await $api.put(`/admin/loan-applications/${id}/approve`);

        if (err) {
          toasts.addError("Loan application", err);
        } 

         if (success) {
           updateApplicationStatus(id, LoanApplicationStatusEnum.APPROVED);
         }

      } catch (err) {
        error.value = err;
        toasts.addError("Error", err as string);
      } finally {
        loading.value = false
      }
    };

    const rejectLoanApplication = async (id: string) => {
      error.value = null
      loading.value = true

      try {
        const { error: err, success }: LoanApplicationRejectResponse =
          await $api.put(`/admin/loan-applications/${id}/reject`);

        if (err) {
          error.value = err
          toasts.addError("Error rejecting", err);
        }

        if (success) {
          updateApplicationStatus(id, LoanApplicationStatusEnum.REJECTED);
        }
        
      } catch (err) {
        error.value = err;
        toasts.addError("Error rejecting", err as string);
      } finally {
        loading.value = false
      }
    };

    const disburseLoan = async (id: string) => {
      error.value = null
      loading.value = true
      try {
        const { error: err, success }: LoanDisburseResponse = await $api.put(
          `/admin/loan-applications/${id}/disburse`
        );

        if (err) {
          error.value = err
          toasts.addError("Loan disbursement error", err as string);
        }

        if (success) {
          updateApplicationStatus(id, LoanApplicationStatusEnum.DISBURSED);
        }
      } catch (err) {
        error.value = err;
        toasts.addError("Loan disbursement error", err as string);
      } finally {
        loading.value = false
      }
    };

    const updateApplicationStatus = (
      id: string,
      status: LoanApplicationStatus
    ) => {
      const _i = applications.value.findIndex((a) => a._id === id);
      if (_i !== -1) {
        applications.value[_i].status = status;

        // only remove the application if action is disbursement
        if(status === LoanApplicationStatusEnum.DISBURSED){
          setTimeout(() => {
            applications.value.splice(_i, 1)
          }, 200)
        }
        console.log('application id', id)
      } else {
        console.log('no application');
        
      }

      switch (status) {
        case LoanApplicationStatusEnum.APPROVED:
          toasts.addSuccess(
            "Approved",
            "Loan application successfully approved"
          );
          break;
        case LoanApplicationStatusEnum.REJECTED:
          toasts.addInfo(
            "Rejected",
            "Loan application successfully rejected"
          );
          break;
        case LoanApplicationStatusEnum.DISBURSED:
          toasts.addSuccess(
            "Disbursed",
            "Loan application successfully disbursed"
          );
          break;
      
        default:
          break;
      }

      
    };

    const getActiveLoans = async () => {
      const {data: error} = await $api.get('/admin/loans/active')
    }

    const resetLoanStore = () => {
      applications.value = [];
      error.value = null;
      loading.value = false;
    };

    return {
      loading,
      error,
      apply,
      applications,
      // member
      withdrawLoanApplication,
      submitLoanApplication,
      getMyLoanApplications,
      deleteLoanApplication,

      //admin
      getLoanApplications,
      approveLoanApplication,
      rejectLoanApplication,
      disburseLoan,

      // use
      resetLoanStore,

      /**loans */


    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoansStore, import.meta.hot));
}
