
import React, { FC, ReactNode } from "react";

interface ClientOnlyProps {
    children: ReactNode[] | ReactNode,
}

const ClientOnly: FC<ClientOnlyProps> = ({ children, ...delegated }) => {

    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null

    /* eslint-disable react/jsx-no-useless-fragment */
    return (<React.Fragment {...delegated}>
        {children}
    </React.Fragment>
    );
}

export default ClientOnly
