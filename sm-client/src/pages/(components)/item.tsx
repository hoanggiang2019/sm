import Image from "next/image";

export const Item = ({id, name, price, desc}: Product) => {
    return (
        <a href="#" className="group">
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                    src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    width={1200}
                    height={800}
                    className="group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
            <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
        </a>
    );
}