import { cn } from "@/lib/utils";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const ALERT_BUTTON_CLASSNAME = "rounded text-medium font-medium h-10 px-4";

const Alert = ({
  trigger,
  title,
  description,
  cancel = "Cancel",
  action = "Continue",
}: {
  trigger: React.ReactNode;
  title: string;
  description: string;
  cancel?: string;
  action: React.ReactNode;
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/40 fixed inset-0 animate-overlay-show" />
        <AlertDialog.Content className="bg-white rounded-lg fixed p-6 shadow animate-content-show overflow-y-auto">
          <AlertDialog.Title className="font-medium">{title}</AlertDialog.Title>
          <AlertDialog.Description className="pt-2 leading-6">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end pt-4">
            <AlertDialog.Cancel
              className={cn("mr-6 bg-secondary", ALERT_BUTTON_CLASSNAME)}
            >
              {cancel}
            </AlertDialog.Cancel>
            <AlertDialog.Action
              asChild
              className={cn("bg-red-200", ALERT_BUTTON_CLASSNAME)}
            >
              {action}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Alert;
