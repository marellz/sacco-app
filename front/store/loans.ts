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
  | LoanApplicationStatusEnum.WITHDRAWN

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
          "/loans/applications",
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
          "/loans/applications"
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
          await $api.put(`/loans/applications/${id}/withdraw`);
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
          await $api.delete(`/loans/applications/${id}`);
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
          await $api.put(`/loans/applications/${id}/submit`);
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
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoansStore, import.meta.hot));
}
