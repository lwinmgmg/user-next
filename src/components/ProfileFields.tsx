import FormInput from "./FormInput";

export default function ProfileFields({ label, className }: {
    label?: string,
    className?: string
}){
    return (
        <div className="flex flex-row justify-center">
            <h2 className={`text-md ${className}`}>
                <FormInput label={label} textCenter />
            </h2>
        </div>
    );
}